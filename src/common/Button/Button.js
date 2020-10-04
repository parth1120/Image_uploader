import React from 'react';
import './Button.css'

const Button = ({ title, styleType, onClick, ...props  }) => {
    return (
        <button type="button" className={styleType} onClick={onClick} {...props}>
            {title.toUpperCase()}
        </button>
    );
}

export default Button;
