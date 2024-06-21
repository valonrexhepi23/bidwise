import React, {useState} from "react";
import hawLogo from "../assets/HAW_Marke_RGB_300dpi.jpg";
import logo from "../assets/BidWise_Logo.png";
import RequirementForm from "../RequirementForm";
import FileUpload from "../FileUpload";

const FileUploadApp = () => {
    const [requirements, setRequirements] = useState([]);
    const [step, setStep] = useState(1);

    const handleNext = (reqs) => {
        setRequirements(reqs);
        setStep(2);
    }
    const handleBefore = (reqs) => {
        setRequirements(reqs);
        setStep(1);
    }
    return (
        <div className="App p-24 h-screen">
            <div className={"flex items-center mb-10 justify-center gap-4"}>
                <div
                    onClick={() => step === 2 && setStep(1)}
                    className={`border cursor-pointer border-gray-200 px-4 py-1 rounded-md ${step === 1 ? "bg-black text-white" : "bg-gray-50"}`}>
                    1. Anforderungen
                </div>
                <div
                    // onClick={() => setStep(2)}
                    className={`border border-gray-200 px-4 py-1 cursor-pointer rounded-md ${step === 2 ? "bg-black text-white" : "bg-gray-50"}`}>
                    2. Dateiupload
                </div>
            </div>
            {step === 1 && <RequirementForm onNext={handleNext} />}
            {step === 2 && <FileUpload requirements={requirements} onBefore={handleBefore}/>}
        </div>
    );
}

export default FileUploadApp;