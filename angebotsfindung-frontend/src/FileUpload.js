import React, { useState } from "react";

function FileUpload({requirements, onBefore}) {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(false);
    const [filesWithContent, setFilesWithContent] = useState([{
        fileTitle: "Paper.pdf",
        fileResponse: "This is a longgggggg very long response This is a longgggggg very long responseThis is a longgggggg very long responseThis is a longgggggg very long response"
    }, {
        fileTitle: "Paper.pdf",
        fileResponse: "This is a longgggggg very long response This is a longgggggg very long responseThis is a longgggggg very long responseThis is a longgggggg very long response"
    }]);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const pdfFiles = selectedFiles.filter(file => file.type === "application/pdf");
        setFiles(pdfFiles);
    };

    const handleBefore = () => {
        onBefore(requirements);
    };


    const handleFileUpload = async () => {
        const formData = new FormData();
        if (files.length > 3 || files.length < 1) {

        } else {
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
            formData.append("requirements",requirements.map(requirement => requirement.requirement).join("\n"));
            setUploadStatus(true);
            try {
                const response = await fetch("/uploadfiles", {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();
                setUploadStatus(false);

                const files = result.files;
                console.log(files);
                setFilesWithContent(
                    files.map(file => {
                            return {
                                fileTitle: file.filename,
                                fileResponse: file.openai_response,
                            }
                        }
                    ));
                console.log(files.map(file => {
                        return {
                            fileTitle: file.filename,
                            fileResponse: file.openai_response,
                        }
                    }
                ))

                // setUploadStatus(result.files[0].openai_response);
                // setUploadStatus(JSON.stringify(result));
            } catch (error) {
                console.error("Error uploading files:", error);
                setUploadStatus("Error uploading files");
            }
        }
    };

    return (
        <div className={"block w-full p-4"}>
            <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
            <button disabled={uploadStatus} className={`font-mono px-3 py-1 bg-amber-50 border border-amber-200 rounded-sm text-sm ${uploadStatus ? "border-amber-100/80 bg-amber-50/80" : ""}`} onClick={handleFileUpload}>
                {uploadStatus ? "isLoading" :  "upload files"}
            </button>
            <div>{uploadStatus}</div>
            <div className={"w-full grid grid-cols-1 gap-2  md:grid-cols-2 py-10"}>
                {filesWithContent.map((fileWithContent, index) => {
                    return (
                        <div key={index} className={"p-4 m-2 h-full border border-slate-100 tracking-tight rounded-sm"}>
                            <div className={"text-md font-mono"}>
                                {fileWithContent.fileTitle}
                            </div>
                            <div className={"mt-5  tracking-normal"}>
                                {fileWithContent.fileResponse.split("**").map((paragraph, index) => {
                                    return (
                                        <p key={index} className={"mb-5"}>
                                            {paragraph}
                                        </p>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <button onClick={handleBefore}>Back</button>
        </div>
    );
}

export default FileUpload;
