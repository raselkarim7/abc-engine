import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js'
const StepThree = (props) => {
		let ctx = useRef (null)

		useEffect(() => {
			if (Object.keys(props.wholeCsvRows).length > 0) {
				console.log('wholeCsvRows ============ ', props.wholeCsvRows)
				renderChart()
			}

		}, [])

		const renderChart = () => {
			new Chart(ctx, {
				type: 'bar',
				data: {
						labels: [ ...props.wholeCsvRows.kp ], // kp as x axis
						datasets: [{
								label: 'KP as x-axis, X as y-axis',
								data: [ ...props.wholeCsvRows.x ], // x as y axis
								backgroundColor: [

								],
								borderColor: [

								],
								borderWidth: 1
						}]
				},
				options: {
						scales: {
								yAxes: [{
										ticks: {
												beginAtZero: true
										}
								}]
						}
				}
			});
		}

    return (
        <div>
          <div className="container mt-5">
            <h1 className="mt-2 mb-1 heading-one">Result </h1>
            <hr className="line-below-heading" />

            <div className="mb-3" style={{'overflow-x':'auto'}}> 
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

            <div className="mb-3" style={{'overflow-x':'auto'}}> 
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

						<div className="mt-2 mb-2"> 
							<div className="chard-heading">Chart </div>
								{
									((Object.keys(props.wholeCsvRows).length > 0) ) && 
									<canvas ref={(ref) => ctx = ref} id="myChart"></canvas>
								}
								{
									((Object.keys(props.wholeCsvRows).length === 0) ) && 
									<div> As no csv is uploaded. No chart is showed.</div>
								}
						</div>

						<div className="row mb-2" >
								<button className="primary-btn" onClick={() => props.setStep(2)}> Go Back </button>
						</div>
					
          </div>
        </div>
    )
}

export default StepThree