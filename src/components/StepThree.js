import React, { useState } from 'react'

const StepThree = (props) => {
   

    return (
        <div>
            <div className="container mt-5">
            <h1 className="mt-2 mb-1 heading-one">Result </h1>
            <hr className="line-below-heading" />

            <div className="mb-3"> 
							<table style={{width: '100%', }}>
								<caption>Step 1 values</caption>
								<thead> 
									<tr>
										<th>Name</th>
										<th>Description</th>
										<th>Client</th>
										<th>Contractor</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td> {props.firstFormValues.name } </td>
										<td> {props.firstFormValues.desc } </td>
										<td> {props.firstFormValues.client } </td>
										<td> {props.firstFormValues.contractor } </td>
									</tr>
								</tbody>
							</table>
            </div>

            <div className="mb-3"> 
							<table style={{width: '100%', }}>
								<caption>Step 2 values</caption>
								<thead> 
									<tr>
										<th>Max X</th>
										<th>Min X</th>
										
										<th>Max Y</th>
										<th>Min Y</th>
										
										<th>Max Z</th>
										<th>Min Z</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td> {props.secondFormValues.max_x } </td>
										<td> {props.secondFormValues.min_x } </td>

										<td> {props.secondFormValues.max_y } </td>
										<td> {props.secondFormValues.min_y } </td>
									
										<td> {props.secondFormValues.max_z } </td>
										<td> {props.secondFormValues.min_z } </td>
									
									</tr>
								</tbody>
							</table>
            </div>



                <div className="border p-2 m-2"> 
                    {JSON.stringify( props.firstFormValues )}
                </div>

                <div className="border p-2 m-2"> 
                    {JSON.stringify(props.secondFormValues)}
                </div>
                
                <div className="border p-2 m-2"> 
                    {JSON.stringify(props.wholeCsvRows)}
                </div>
                
            </div>
        </div>
    )
}

export default StepThree