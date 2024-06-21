import logo from "../assets/BidWise_Logo.png";
import hawLogo from "../assets/HAW_Marke_RGB_300dpi.jpg";

const ProjectPage = () => {
    return (
        <div className={"p-10"}>
            <div className={"flex pb-10"}>

                <img src={hawLogo} alt="logo" className={"w-52 "}/>
                <img src={logo} alt={"logo"} className={"w-24"}/>
            </div>
            <h1 className={"text-4xl font-semibold tracking-tight"}>Über dieses Projekt</h1>
            <p className={"mt-5 tracking-wide text-xl ml-1"}>
                Dieses Projekt wurde im Rahmen des Moduls "LLMs für KMUs" an der HAW Hamburg erstellt.
                Ziel war es, ein Software-Produkt zu entwickeln, welches mehrere Angebote von verschiedenen
                Anbietern anhand gewissen Anforderungen vergleicht.
            </p>
            <div className={"mt-10 text-xl"}>
                <h3 className={"text-2xl font-semibold"}>Verwendete Technologien:</h3>
                <ul className={"list-disc ml-5 mt-2"}>
                    <li>React</li>
                    <li>Python</li>
                    <li>TailwindCSS</li>
                    <li>OpenAI API</li>
                    <li>LangChain Framework</li>
                    <li>PyMuPDF</li>
                </ul>
            </div>
            <div>
                <h3 className={"mt-10 text-2xl font-semibold"}>Team:</h3>
                <ul className={"text-xl list-disc ml-5 mt-2"}>
                    <li>Valon Rexhepi</li>
                    <li>Tolga Ayaz</li>
                    <li>Karsten Zarth</li>
                </ul>
            </div>
            <div>
                <h3 className={"mt-10 text-2xl font-semibold"}>Code</h3>
                <a href={"https://github.com/valonrexhepi23/bidwise"} className={"text-blue-500 underline"}>Github</a>
            </div>
        </div>
    );
}
export default ProjectPage;