import React from 'react'

const StepOne = () => {
    return (
        <div>
            <div className="container mt-5">
            <h1 className="mt-2 mb-1 heading-one">Step 1</h1>
            <hr className="line-below-heading" />
                <form onSubmit={(event) => event.preventDefault()}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="project-name">Project Name</label>
                        </div>
                        <div className="col-75">
                            <input disabled type="text" id="project-name" name="project-name" placeholder="Enter Project Name" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="project-description">Project Description</label>
                        </div>
                        <div className="col-75">
                            <textarea id="subject" name="project-description" placeholder="Write Project Description..." style={{ height: "150px", }} ></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="client-name">Client Name</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="client-name" name="client-name" placeholder="Enter Client Name" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="contractor-name">Contractor Name</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="contractor-name" name="contractor-name" placeholder="Enter Contractor Name" />
                        </div>
                    </div>



                    <div className="row mt-2 pb-2">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StepOne