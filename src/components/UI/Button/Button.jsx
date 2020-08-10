import React from 'react';
import Classes from './Button.module.css'

const button = (props) => (
    <button 
        className={[Classes.Button, Classes[props.btnType]].join(' ')}
        onClick={props.clicked} disabled={props.disable}>
        {props.children}
        </button>
);

export default button;
