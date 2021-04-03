import React from 'react';

const City = ({data}) => {
    return (
        <div>
            <h1>{data.City}, {data.State}</h1>
            <ul>
                <li>State: {data.State}</li>
                <li>Location: ({data.Lat}, {data.Long})</li>
                <li>Population (estimated): {data.EstimatedPopulation}</li>
                <li>Total Wages: {data.TotalWages}</li>
            </ul>
        </div>
    )
}

export default City