import React, {useState} from "react";

function FileUpload({requirements, onBefore}) {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(false);
    const [filesWithContent, setFilesWithContent] = useState([{
        fileTitle: "Paper.pdf",
        fileResponse: "This is a longgggggg very long response This is a longgggggg very long responseThis is a longgggggg very long responseThis is a longgggggg very long response"
    }
    ]);

    const [isUploading, setIsUploading] = useState(false);


    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const pdfFiles = selectedFiles.filter(file => file.type === "application/pdf");
        setFiles(pdfFiles);
        setFilesWithContent(pdfFiles.map(file => {
            return {
                fileTitle: file.name,
                fileResponse: "",
            }
        }))
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
            formData.append("requirements", requirements.map(requirement => requirement.requirement).join("\n"));
            setUploadStatus(true);
            try {
                setIsUploading(true);
                const response = await fetch("/api/uploadfiles", {
                    method: "POST",
                    body: formData,
                });

                const result = await response.json();
                setUploadStatus(false);
                setIsUploading(false);
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
        <div className={"block  w-full px-20"}>
            <div className={"w-full flex justify-center"}>
                <input type="file" accept="application/pdf" multiple onChange={handleFileChange}/>
                <button disabled={uploadStatus || files.length === 0}
                        className={`font-mono disabled:opacity-50 
                         px-4 py-2 bg-amber-50 border border-amber-300 rounded-md text-amber-600 tracking-tight text-sm ${uploadStatus ? "border-amber-100/80 bg-amber-50/80" : ""}`}
                        onClick={handleFileUpload}>
                    {uploadStatus ? "isLoading" : "upload files"}
                </button>
            </div>
            <div>{uploadStatus}</div>
            <div className={"w-full grid grid-cols-1 gap-10 px-10 md:grid-cols-2 py-10 "}>
                {filesWithContent.map((fileWithContent, index) => {
                    return (
                        <div key={index}
                             className={"p-4 m-2 min-h-60 w-fit border border-slate-300 bg-gray-50 tracking-tight rounded-md min-w-full"}>
                            <div className={"text-lg tracking-tight font-mono"}>
                                {fileWithContent.fileTitle}
                            </div>
                            <div className={"flex flex-col justify-end p-4  tracking-normal"}>
                                {fileWithContent.fileResponse.split("**").map((paragraph, index) => {
                                    return (
                                        <div key={index}>
                                            <p className={"mb-5  break-words"}>
                                                {paragraph}
                                            </p>
                                            <span
                                                className={`loading loading-dots loading-md ${isUploading ? "block" : "hidden"} `}
                                            ></span>
                                        </div>

                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <button
                onClick={handleBefore}
                className={"bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-100"}
            >
                Back
            </button>
        </div>
    )
        ;
}

export default FileUpload;
