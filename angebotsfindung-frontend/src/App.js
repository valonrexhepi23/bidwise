import React, {useState} from "react";
import FileUpload from "./FileUpload";
import RequirementForm from "./RequirementForm";
import hawLogo from './assets/HAW_Marke_RGB_300dpi.jpg';
import logo from './assets/BidWise_Logo.png';
function App() {
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
      <div className="App">
          <div className={"flex items-center justify-center"}>
              <img src={hawLogo} alt="logo" className={"w-24 "}/>
              <img src={logo} alt={"logo"} className={"w-24"}/>
          </div>
          {step === 1 && <RequirementForm onNext={handleNext} /> }
          {step === 2 && <FileUpload requirements={requirements} onBefore={handleBefore} />}
      </div>
  );
}

export default App;
