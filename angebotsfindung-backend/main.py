from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import pymupdf
import openai
from dotenv import load_dotenv
import os
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

load_dotenv()

app = FastAPI()

openai.api_key = os.getenv("OPENAI_API_KEY")

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def prompt(requirements, offers):
    pr = f"""
    Vergleiche die folgenden Angebote mit den angegebenen Anforderungen und liste die positiven und negativen Aspekte auf:

    **Anforderungen:**
    {requirements}
    **Angebote:**
    {offers}
    **Ergebnisse:**
    Angebot:
    positiv:
    \n\n
    negativ:
    -

    Halte dich sehr(!) kurz. Gib für jede erfüllte und nicht erfüllte Anforderung eine sehr kurze Beschreibung (maximal 1 Satz). Beurteile Anforderungen nur, wenn ausreichende Informationen vorliegen.
    """
    return pr


async def extract_text_from_pdf(file: UploadFile):
    content = await file.read()
    pdf_document = pymupdf.open(stream=content, filetype="pdf")
    text = ""
    for page in pdf_document:
        text += page.get_text()
    return text


async def process_file(file: UploadFile, requirements: str = None):
    if file.content_type != 'application/pdf':
        return {"filename": file.filename, "error": "Invalid file type"}

    text = await extract_text_from_pdf(file)
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=300,
        chunk_overlap=0,
        length_function=len,
    )

    texts = text_splitter.split_text(text)
    embeddings = OpenAIEmbeddings()

    requirements_list = requirements.split("\n")
    results = {}
    offer_embeddings = embeddings.embed_documents(texts)
    for req in requirements_list:
        vectors = embeddings.embed_query(req)
        vector_store = FAISS.from_embeddings(
            text_embeddings=list(zip(texts, offer_embeddings)),
            embedding=embeddings
        )
        similar_offers = vector_store.similarity_search_by_vector(vectors, k=5)
        if similar_offers:
            results[req] = "\n".join([f"{k.page_content}" for k in similar_offers])
        else:
            results[req] = "\nDiese Anforderung ist nicht erfüllt."
    # Call OpenAI API with extracted text
    results = "\n".join([f"{v}" for k, v in results.items()])
    print(results)
    response = openai.chat.completions.create(
        messages=[
            {"role": "system",
             "content": "Du bist ein erfahrener Angebotsanalyst. "
                        "Vergleiche das folgende Angebot mit den angegebenen Anforderungen "
                        "und liste die positiven und negativen Aspekte auf. Gib eine sehr(!) kurze Beschreibung "
                        "(maximal 1 Satz, maximal 12 Wörter) für jede erfüllte und nicht erfüllte Anforderung. Erfinde nichts. "
                        "Beurteile Anforderungen nur, wenn ausreichende Informationen vorliegen. "
                        "Wenn du nicht genügend Informationen hast, schreibe nichts!"
             },
            {"role": "user", "content": prompt(requirements, results)},
        ],
        model="gpt-4-turbo",
        max_tokens=2000,
    )

    print(response.choices[0].message.content)
    full_response = f"""
    Anforderungen: {requirements}
    
    {response.choices[0].message.content}
    """
    return {"filename": file.filename, "content_length": len(text),
            "openai_response": full_response}


@app.post("/uploadfiles")
async def create_upload_files(files: list[UploadFile] = File(...), requirements: str = Form(...)):
    print(requirements)
    results = await asyncio.gather(*[process_file(file, requirements) for file in files])
    return JSONResponse(content={"files": results})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
