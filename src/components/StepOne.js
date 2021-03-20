import React, { useState } from 'react'

const StepOne = (props) => {
    const [project, setProject] = useState({
        name: '',
        desc: '',
        client: '',
        contractor: '',
    })

    const [submitClicked, setSubmitClicked] = useState(0)
    console.log('project: ', project)


    const handleFormSubmit = (event) => {
        event.preventDefault()
        setSubmitClicked( submitClicked + 1)
        for (let key in project) {
            if (project[key] == "") {
                return // if field value is empty then we return, we don't need to go step 2.
            }
        }

        props.setFirstFormValues( project )
        props.setStep(2)
    }
    const hasInputError = (param) => {
        if (project[param] === "" && submitClicked > 0) {
            return true
        }
        return false
    } 

    return (
        <div>
            <div className="container mt-5">
            <h1 className="mt-2 mb-1 heading-one">Step 1</h1>
            <hr className="line-below-heading" />
                <form onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="project-name">Project Name</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" id="project-name" value={project.name} name="project-name" placeholder="Enter Project Name" 
                                className={hasInputError('name') ? 'input-error' : ''}
                                disabled={(hasInputError('name') === false) && (props.step === 2)}
                                onChange={(event) => setProject({...project, name: event.target.value })}
                            />
                            {   hasInputError('name') && <span className="input-error-msg"> Required </span> }
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="project-description">Project Description</label>
                        </div>
                        <div className="col-75">
                            <textarea 
                                id="subject" name="project-description" placeholder="Write Project Description..." style={{ height: "150px", }} 
                                className={hasInputError('desc') ? 'input-error' : ''}
                                disabled={(hasInputError('desc') === false) && (props.step === 2)}
                                onChange={(event) => setProject({...project, desc: event.target.value })}
                            />
                            {   hasInputError('desc') && <span className="input-error-msg"> Required </span> }
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="client-name">Client Name</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" id="client-name" name="client-name" placeholder="Enter Client Name" 
                                className={hasInputError('client') ? 'input-error' : ''}
                                disabled={(hasInputError('client') === false) && (props.step === 2)}
                                onChange={(event) => setProject({...project, client: event.target.value })}
                            />
                            {   hasInputError('client') && <span className="input-error-msg"> Required </span> }
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="contractor-name">Contractor Name</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" id="contractor-name" name="contractor-name" placeholder="Enter Contractor Name" 
                                className={hasInputError('contractor') ? 'input-error' : ''}
                                disabled={(hasInputError('contractor') === false) && (props.step === 2)}
                                onChange={(event) => setProject({...project, contractor: event.target.value })}
                            />
                            {   hasInputError('contractor') && <span className="input-error-msg"> Required </span> }
                        </div>
                    </div>


                    {
                        (props.step === 1) &&
                        <div className="row mt-2 pb-2">
                            <input type="submit" value="Submit" />
                        </div>
                    }

                </form>
            </div>
        </div>
    )
}

export default StepOne