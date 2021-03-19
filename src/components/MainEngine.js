
import { useState } from 'react';
import StepOne from './StepOne'
import StepTwo from './StepTwo'

function MainEngine() {
  const [step, setStep] = useState(2)
  return (
    <div className="MainEngine">
        { 'step =========== ' + JSON.stringify(step)}
        <StepOne step={step} setStep={setStep} /> 
        {
          (step === 2) && 
          <StepTwo step={step} setStep={setStep} /> 
        }

        
    </div>
  );
}

export default MainEngine;
