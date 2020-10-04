import React from 'react'
import './Error.css'

const Error = ({errorMessage}) => {
    return (
        <div className="error">
        <p> {errorMessage} </p>
    </div>
    )
}

export default Error
