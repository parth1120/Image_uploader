import React from 'react';
import './Loader.css';

const Loader = ({
    text = "Loading..."    //Default Value
}) => {
    return (
        <div className="loading-container">
            <span>{text}</span>
        </div>
    );
}

export default Loader;