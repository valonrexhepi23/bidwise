import React, {useState} from "react";
import {Trash, Wand, XCircle} from "lucide-react";
import logo from "./assets/HAW_Marke_RGB_300dpi.jpg";

function RequirementsForm({requirements, setRequirements, onNext}) {
    const [requirement, setRequirement] = useState("");

    const handleRequirementChange = (index, event) => {
        if (requirements.length < 5) {
            const newRequirements = [...requirements];
            newRequirements.push({requirement: requirement});
            setRequirements(newRequirements);
            setRequirement("");
        }
    };

    function handleDeleteRequirement(index) {
        // setRequirements()
        const newRequirements = [...requirements];
        newRequirements.splice(index, 1);
        setRequirements(newRequirements);
    }

    const handleNext = () => {
        onNext(requirements);
    };


    return (
        <div className={"w-full flex flex-col items-center mt-5"}>
            <div className={"flex items-center justify-center p-4 pb-10"}>
                <p className={"text-sm tracking-wider"}>
                    Gebe die Anforderungen ein. Anhand dieser Anforderungen werden die Angebote verglichen.
                </p>
            </div>
            <div className={"border p-4 rounded-md shadow-md "}>


                <div className={"min-h-[300px] w-full min-w-[500px] max-w-[500px] flex flex-col items-center relative"}>
                    <div className={"w-full flex flex-wrap gap-2 "}>

                        {
                            requirements.map((req, index) => {
                                return (
                                    <div key={index}
                                         className={`flex border relative  px-4 py-2 rounded-xl group bg-gray-50`}>
                                        <div className={"break text-xs "}>
                                            {req.requirement}
                                        </div>
                                        <div
                                            onClick={() => handleDeleteRequirement(index)}
                                            className={"text-xs text-gray-800 z-10 flex items-center cursor-pointer"}
                                        >
                                            <XCircle className={"w-4 h-4 ml-2 text-gray-600"}/>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    <div className={"absolute bottom-1 w-full"}>
                        <div className={"w-full flex gap-2"}>
                            <input
                                className={"border border-slate-200 w-10/12 shadow-sm p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-200"}
                                type="text"
                                placeholder={`Bsp. Lieferzeit beträgt 4 Wochen`}
                                minLength={5}
                                maxLength={100}
                                value={requirement}
                                onChange={(event) => setRequirement(event.target.value)}
                            />
                            <button onClick={handleRequirementChange}
                                    disabled={requirement.trim() === ""}
                                    className={"border hover:bg-gray-200 border-slate-200 disabled:text-gray-500 disabled:bg-gray-50 bg-slate-50 font-medium tracking-tight px-4 py-1 rounded-md"}
                            >
                                Hinzufügen
                            </button>
                        </div>

                        <h2 className={"text-xs tracking-tight mt-2 pl-2"}>Anforderung: {requirements.length}/5 </h2>
                    </div>
                </div>
                </div>
                <div className={"flex gap-2 justify-end"}>

                    <button
                        disabled={requirements.length === 0}
                        className={"px-4 hover:bg-gray-700 transition-colors duration-100 py-1 border-gray-500 disabled:bg-gray-700  bg-black text-white border rounded-md"}
                        onClick={handleNext}>
                        Nächste Seite
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RequirementsForm;
