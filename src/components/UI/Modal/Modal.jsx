import React from 'react';
import Classes from './Modal.module.css';

const modal = (props) => {
    return(    
        <div className={Classes.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translate(-100)',
            opacity: props.show ? '1' : '0'
        }}>
            {props.children}
        </div>        
    );
}
export default modal;