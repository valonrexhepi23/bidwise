from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import fitz  # PyMuPDF
import openai
from dotenv import load_dotenv
import os

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
    
    Beachte:
    1. Überprüfe, ob die Stückzahl mindestens den Anforderungen entspricht.
    2. Überprüfe, ob der Gesamtpreis die Anforderungen nicht überschreitet.
    3. Liste die positiven Aspekte auf, wenn die Anforderungen erfüllt sind.
    4. Liste die negativen Aspekte auf, wenn die Anforderungen nicht erfüllt sind.

    **Ergebnisse:**
    Angebot:
    "positiv":
    -
    "negativ":
    -
    "Fazit":
    -
    """
    return pr


async def extract_text_from_pdf(file: UploadFile):
    content = await file.read()
    pdf_document = fitz.open(stream=content, filetype="pdf")
    text = ""
    for page in pdf_document:
        text += page.get_text()
    return text


async def process_file(file: UploadFile, requirements: str = None):
    if file.content_type != 'application/pdf':
        return {"filename": file.filename, "error": "Invalid file type"}

    text = await extract_text_from_pdf(file)

    # Call OpenAI API with extracted text
    response = openai.chat.completions.create(
        messages=[
            {"role": "system",
             "content": "Du bist ein erfahrener Angebotsanalyst. Vergleiche das folgende Angebot mit den angegebenen "
                        "Anforderungen und liste kurz die positiven und negativen Aspekte auf."},
            {"role": "user", "content": prompt(requirements, text)},
        ],
        model="gpt-4o",
        max_tokens=1000,
    )

    print(response.choices[0].message.content)

    return {"filename": file.filename, "content_length": len(text),
            "openai_response": response.choices[0].message.content}


@app.post("/uploadfiles")
async def create_upload_files(files: list[UploadFile] = File(...), requirements: str = Form(...)):
    print(requirements)
    results = await asyncio.gather(*[process_file(file, requirements) for file in files])
    return JSONResponse(content={"files": results})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
