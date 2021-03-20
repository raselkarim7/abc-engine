import React, { useEffect, useState } from 'react'
    
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


    useEffect(() => {

        let errors = {...csvDataError}
        setSubmitClicked( submitClicked + 1)

        for (let key in csvData) {
            if (csvData[key] === "") {
                errors[key] = 'Required'

            } else if (checkMultipleDots( csvData[key] )) {
                errors[key] = "Input can't have multiple dots"

            } else if ( isNaN(csvData[key]) ) {
                errors[key] = "Input only number."

            } else if ( `${csvData[key]}`.includes('.') && (countDecimals(csvData[key]) > 5)) {
                errors[key] = "Use decimal point less than 5"

            } else if ( checkIfMaxValueIsMin_Or_MinValueIsMax (key, csvData) ) {
                const [type, keyLastChar] = key.split('_')
                if (type === "max") {
                    errors[key] = `Max ${keyLastChar.toUpperCase()} value is less than Min ${keyLastChar.toUpperCase()} value` 
                } else {
                    errors[key] = `Min ${keyLastChar.toUpperCase()} value is greater than Max ${keyLastChar.toUpperCase()} value` 
                }

            } else {
                errors[key] = ""
            }
        }

        // console.log('errors === ', errors)
        props.setSecondFormValues( csvData )
        setCsvDataError( {...errors} )

    }, [csvData])


    const checkIfMaxValueIsMin_Or_MinValueIsMax = (key, obj) => {
        const [type, keyLastChar] = key.split('_')
        if (type === 'max') {
            let minkey = `min_${keyLastChar}`
            if ( parseFloat( obj[key] ) < parseFloat( obj[minkey] ) ) { // max value is less than min value
                return true
            }
        }
        let maxkey = `max_${keyLastChar}`
        if ( parseFloat( obj[key] ) > parseFloat( obj[maxkey] ) ) { // min value is greater than max value 
            return true
        }
        return false
    }

    const processCsvFile = (csvFile) => {
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
                        csvObj [index] = {colName: `${headings[index]}`.toLowerCase(), values: []} // Sample Obj: {colName: 'kp', values:[]}
                    }
                } else {
                    for(let index in headings) {
                        if (headings[index] !== "") {
                            csvObj[index] = {
                                colName: csvObj[index].colName, 
                                values: [
                                    ...csvObj[index].values, parseFloat(headings[index]) 
                                ]
                            } // Sample Obj: {colName: 'kp', values:[0,1,2,3.......]} OR {colName: 'x', values:[ 22, 14, 20, 17.......]} etc. 
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
            props.setWholeCsvRows( keyByCsv )
        }
    }

    const handleFileUpload = (event) => {

        const csvFile = event.target.files[0]
        if (csvFile !== undefined ) {
            try {
                if (['application/vnd.ms-excel'].includes( csvFile.type )) {
                    processCsvFile( csvFile )
                } else {
                    throw new Error('Upload the csv file.')
                }

            } catch (error) {
                props.setWholeCsvRows({ }) // if error then
                alert(error)
            }
        } else {
            props.setWholeCsvRows({ }) // if no file is selected.

        }

    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        let hasError = false
        for (let key in csvDataError) {
            const msg = csvDataError[ key ]
            if (msg !== "") {
                hasError = true
                break
            }
        }

        if (hasError === false) {
            props.setStep(3)
        }
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

        if ( checkIfMaxValueIsMin_Or_MinValueIsMax(param, csvData) ) {
            return true
        }

        return false
    } 


    const handleGoBack = ( event ) => {
        event.preventDefault()
        props.setStep(1)
    }

    return (
        <div>   
            <div className="container mt-5 mb-3">
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

                    <div className="step-two-lastrow mt-2 pb-2">
                        <div></div>
                        <div className="right" >
                            <button className="primary-btn " onClick={handleGoBack}> Go Back </button>    
                            <input type="submit" value="Next" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StepTwo