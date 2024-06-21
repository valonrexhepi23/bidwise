import React, {useState} from "react";
import FileUpload from "./FileUpload";
import RequirementForm from "./RequirementForm";
import hawLogo from './assets/HAW_Marke_RGB_300dpi.jpg';
import logo from './assets/BidWise_Logo.png';
import {Wand, Zap, Brain} from "lucide-react";
import {useNavigate} from "react-router-dom";

function App() {

    const navigate = useNavigate();

    const features = [
        {
            title: "Blitzschnelle Vergleiche",
            description: "Durch Vektorsuche, verschnellern wir die Analyse mehrere Angeboten von Tagen auf wenige Minuten und liefern Dir die besten Optionen auf einen Blick.",
            icon: <Zap className={"w-5 h-5 text-yellow-400 mr-2"}/>,
            path: "/vectorsearch",
        },
        {
            title: "Einfache Bedienung",
            description: "Eine intuitive Benutzeroberfläche, die dir alle Informationen klar und verständlich darstellt.",
            icon: <Brain className={"w-5 h-5 text-pink-500 mr-2"}/>,
            path: "/fileUpload"
        },
        {
            title: "Künstliche Intelligenz",
            description: "Mithilfe von ChatGPT-4o analysieren wir deine Anforderungen und liefern dir die besten Ergebnisse.",
            icon: <Wand className={"w-5 h-5 text-purple-500 mr-2"}/>,
            path: "/ai",
        }
    ]

    const handleClick = () => {
        navigate("/fileupload")
    }

    return (
        <div className="App">
            <div className={"flex items-center justify-center"}>
                <img src={hawLogo} alt="logo" className={"w-24 "}/>
                <img src={logo} alt={"logo"} className={"w-24"}/>
            </div>
            <div className={"w-full flex flex-col items-center mt-5"}>
                <h1 className={" font-light text-6xl mb-2 tracking-tight text-gray-700 drop-shadow-md"}>
                    Vergleiche deine Angebote.
                </h1>
                <h1 className={"font-light flex text-6xl tracking-tight mb-10 drop-shadow-md text-gray-700"}>
                    <span className={"italic"}>
                        Schneller.&nbsp;
                    </span>
                    Einfacher.
                    &nbsp;
                    <span
                        className={"flex items-center font-medium text-indigo-600 italic font-serif"}>
                        Mit KI
                        <Wand className={"ml-2 h-7 w-7"}/>
                        .
                    </span>
                </h1>
                <p className={"mb-16 tracking-wider font-light text-lg"}>
                    Entdecke die Kraft der künstlichen Intelligenz und vergleiche deine Angebote wie nie zuvor.
                </p>

                <div className={"w-full flex justify-center"}>
                    <button
                        className={
                            `px-10 py-3 font-semibold  border
                            bg-indigo-600 text-white
                            border-y-indigo-700 
                         rounded-md shadow-sm text-sm
                         transition-colors duration-100
                         hover:bg-indigo-700 hover:border-indigo-800
                        `
                        }
                        onClick={handleClick}
                    >
                        Starte Jetzt!
                    </button>
                </div>
            </div>
            <div className={"w-full flex flex-col items-center mt-24"}>
                <p className={"font-mono text-xs"}>[ Was dich erwartet ]</p>
                <div className={"gap-4 grid grid-cols-1 px-10 md:grid-cols-3  py-10 "}>
                    {features.map((feature, index) => {
                        return (
                            <div key={index}
                                 onClick={() => navigate(feature.path)}
                                 className={"cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition duration-300 w-full p-10 flex border max-w-[400px] group bg-gray-50/60 border-gray-200 rounded-xl shadow-sm items-center " +
                                     "flex-col "}>
                                <div className={"flex items-center pb-4"}>
                                    {feature.icon}
                                    <p className={"font-semibold group-hover:text-indigo-700 transition duration-500 "}>
                                        {feature.title}
                                    </p>
                                </div>
                                <p className={"font-light tracking-wide text-center group-hover:text-indigo-600 text-sm"}>
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div className={"absolute bottom-0 w-full border border-gray-200"}>
                <div className={"w-full flex justify-center items-center gap-4 p-4"}>
                    <p className={"text-xs"}>
                        © 2024 BidWise
                    </p>
                    <p className={"text-xs"}>
                        Impressum
                    </p>
                    <p className={"text-xs"}>
                        Datenschutz
                    </p>
                    <a className={"text-xs cursor-pointer"} onClick={() => navigate("/project")}>
                        Über dieses Projekt
                    </a>
                </div>
            </div>
        </div>
    );
}

export default App;
