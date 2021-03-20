
import { useState } from 'react';
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'

function MainEngine() {
  const [step, setStep] = useState( 1 )
  const [firstFormValues, setFirstFormValues] = useState({ })
  const [secondFormValues, setSecondFormValues] = useState({ })
  const [wholeCsvRows, setWholeCsvRows] = useState( {} )

  return (
    <div className="MainEngine">
        {
          (step < 3) &&
          <StepOne 
            step={step} 
            setStep={setStep} 
            setFirstFormValues={setFirstFormValues} 
          /> 
        }

        {

          <div style={{ display: step === 2 ? 'block' : 'none'}}> 
            <StepTwo 
              step={step} 
              setStep={setStep} 
              setWholeCsvRows={setWholeCsvRows} 
              setSecondFormValues={setSecondFormValues} 
            /> 
          </div>

        }
  
        {
          (step === 3) &&
          <StepThree 
            step={step} 
            setStep={setStep} 
            firstFormValues={firstFormValues}
            secondFormValues={secondFormValues}
            wholeCsvRows={wholeCsvRows} 
          />
        }

        
    </div>
  );
}

export default MainEngine;
