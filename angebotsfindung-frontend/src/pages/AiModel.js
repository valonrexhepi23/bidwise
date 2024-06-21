import hawLogo from "../assets/HAW_Marke_RGB_300dpi.jpg";
import logo from "../assets/BidWise_Logo.png";
import React from "react";

const AiModelPage = () => {
    return (
        <div className={"p-10"}>
            <div className={"flex items-center justify-center"}>
                <img src={hawLogo} alt="logo" className={"w-24 "}/>
                <a href={"/"}>
                    <img src={logo} alt={"logo"} className={"w-24"}/>
                </a>
            </div>
            <div className={"mt-24 p-10 border rounded-lg bg-gray-50/80"}>

                <h1 className={"tracking-tight text-2xl flex items-center"}>Modell: GPT-4o <span
                    className={"pl-2 text-sm border px-2 py-1 bg-green-50 border-green-300 text-green-800 tracking-tight font-medium ml-2 rounded-xl"}>new</span>
                </h1>
                <div className={"mt-5"}>

                    <h3 className={"text-xl font-medium"}>Warum haben wir uns für dieses Modell entschieden?</h3>
                    <p className={"mt-2"}>
                        Wir haben uns für das GPT-4o Modell entschieden, weil es das neueste Modell von OpenAI ist.
                    </p>
                    <p>
                        Es ist kostengünstiger in der Anwendung als das GPT-4 Modell und hat eine bessere Performance
                        als
                        das GPT-3.5 Modell.
                    </p>
                    <p>
                        Außerdem bietet die durch die Kontextgröße von 128k Tokens eine bessere Performance als das
                        GPT-3
                        Modell (16k Kontextlänge).
                    </p>
                </div>
            </div>

        </div>
    );
}
export default AiModelPage;