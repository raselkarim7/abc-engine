import React, { useEffect, useRef, useState } from 'react'
    
const StepTwo = (props) => {

    const [csvData, setCsvData] = useState({
        max_x: '',
        min_x: '',

        max_y: '',
        min_y: '',

        max_z: '',
        min_z: '',
    })

    
    const [csvDataError, setCsvDataError] = useState({
        max_x: '',
        min_x: '',

        max_y: '',
        min_y: '',

        max_z: '',
        min_z: '',
    })



    const [submitClicked, setSubmitClicked] = useState(0)
    console.log('csvData: ', csvData)

    useEffect(() => {
        let errors = {...csvDataError}
        setSubmitClicked( submitClicked + 1)

        for (let key in csvData) {
            if (csvData[key] == "") {
                errors[key] = 'Required'
            } else if (checkMultipleDots( csvData[key] )) {
                errors[key] = "Input can't have multiple dots"
            } else if ( isNaN(csvData[key]) ) {
                errors[key] = "Input only number."
            } else if ( `${csvData[key]}`.includes('.') && (countDecimals(csvData[key]) > 5)) {
                errors[key] = "Use decimal point less than 5"
            } else {
                errors[key] = ""
            }
        }
        console.log('errors === ', errors)
        setCsvDataError( {...errors} )

    }, [csvData])

    const handleFileUpload = (event) => {

        const csvFile = event.target.files[0]

        if (csvFile !== undefined) {
            const myReader = new FileReader();
            myReader.readAsText(csvFile);
            myReader.onload = function(e) {
                const textContent = myReader.result;
                const contentRows = textContent.split('\n')
                let csvObj = {}
                for(let i=0; i<contentRows.length; i++) {
                    let row = contentRows[i]
                    let headings = row.split(',')
                    if (i === 0) {
                        for(let index in headings) {
                            csvObj [index] = {colName: `${headings[index]}`.toLowerCase(), values: []}
                        }
                    } else {
                        for(let index in headings) {
                            if (headings[index] !== "") {
                                csvObj[index] = {
                                    colName: csvObj[index].colName, 
                                    values: [
                                        ...csvObj[index].values, parseFloat(headings[index]) 
                                    ]
                                }
                            }
                        }
                    }
                }

                let keyByCsv = { }
                for (let key in csvObj) {
                    keyByCsv[ csvObj[key].colName ] = csvObj[key].values.sort((a, b) => a - b)
                }

                function getData(param) {
                    const [type, key] = param.split('_')
                    console.log('type ==== ', type, 'key === ', key)

                    if (type === 'max') {
                        return keyByCsv[key][ keyByCsv[key].length - 1 ]
                    }
                    return keyByCsv[key][0]
                }
                
                let output = {
                    max_x: getData('max_x'),
                    min_x: getData('min_x'),
            
                    max_y: getData('max_y'),
                    min_y: getData('min_y'),

                    max_z: getData('max_z'),
                    min_z: getData('min_z'),
                }

                setCsvData( output )
            }
        }

    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
       
        // props.setStep(2)
        console.log('here comes the code .............')
    }

    const checkMultipleDots = function (param) {
        let str = `${param}`
        if (str.length === 0) {
            return false
        }

        let counter = 0; 
        for(let pos in str) {
            if (str[pos] === ".") {
                counter = counter + 1
            }
        }
        return counter > 1 ? true : false 
    }

    const countDecimals = function (param) {
        let counter = 0; 
        if(Math.floor(param.valueOf()) === param.valueOf()) {
            return counter;
        }
        counter = param.toString().split(".")[1].length || 0; 
        return counter
    }

    const hasInputError = (param) => {
        if (checkMultipleDots(csvData[param])) {
            return true
        }
        if ((csvData[param] === "" || isNaN(csvData[param])) && submitClicked > 0) {
            return true
        }
        if (`${csvData[param]}`.includes('.') && (countDecimals(csvData[param]) > 5) ) {
            return true
        }
        return false
    } 

    return (
        <div>
            {
                JSON.stringify(csvData)
            }
            <div className="container mt-5">
            <h1 className="mt-2 mb-1 heading-one">Step 2</h1>
            <hr className="line-below-heading" />
                <form onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="project-name">File upload</label>
                        </div>
                        <div className="col-75" style={{marginTop: '10px' }}>
                            <input 
                                onChange={handleFileUpload}
                                type="file" id="myFile" name="filename" 
                            />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="max_x">Max X</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" id="max_x" name="max_x" placeholder="Enter Max X" 
                                className={hasInputError('max_x') ? 'input-error' : ''}
                                value={csvData.max_x}
                                onChange={(event) => setCsvData({...csvData, max_x: event.target.value })}
                            />
                            {   hasInputError('max_x') && <span className="input-error-msg"> {csvDataError.max_x} </span> }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="min_x">Min X</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" id="min_x" name="min_x" placeholder="Enter Min X" 
                                className={hasInputError('min_x') ? 'input-error' : ''}
                                value={csvData.min_x}
                                onChange={(event) => setCsvData({...csvData, min_x: event.target.value })}
                            />
                            {   hasInputError('min_x') && <span className="input-error-msg"> {csvDataError.min_x} </span> }
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="max_y">Max Y</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" id="max_y" name="max_y" placeholder="Enter Max Y" 
                                className={hasInputError('max_y') ? 'input-error' : ''}
                                value={csvData.max_y}
                                onChange={(event) => setCsvData({...csvData, max_y: event.target.value })}
                            />
                            {   hasInputError('max_y') && <span className="input-error-msg"> {csvDataError.max_y} </span> }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="min_y">Min Y</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" id="min_y" name="min_y" placeholder="Enter Min Y" 
                                className={hasInputError('min_y') ? 'input-error' : ''}
                                value={csvData.min_y}
                                onChange={(event) => setCsvData({...csvData, min_y: event.target.value })}
                            />
                            {   hasInputError('min_y') && <span className="input-error-msg"> {csvDataError.min_y} </span> }
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="max_z">Max Z</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" id="max_z" name="max_z" placeholder="Enter Max Z" 
                                className={hasInputError('max_z') ? 'input-error' : ''}
                                value={csvData.max_z}
                                onChange={(event) => setCsvData({...csvData, max_z: event.target.value })}
                            />
                            {   hasInputError('max_z') && <span className="input-error-msg"> {csvDataError.max_z} </span> }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="min_z">Min Z</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" id="min_z" name="min_z" placeholder="Enter Min Z" 
                                className={hasInputError('min_z') ? 'input-error' : ''}
                                value={csvData.min_z}
                                onChange={(event) => setCsvData({...csvData, min_z: event.target.value })}
                            />
                            {   hasInputError('min_z') && <span className="input-error-msg"> {csvDataError.min_z} </span> }
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

export default StepTwo