import React from 'react';
import Classes from './Modal.module.css';
import Aux from '../../../hoc/Auxalary'
import BackDrop from '../BackDrop/BackDrop'

const modal = (props) => {
    return(    
        <Aux>
            <BackDrop show={props.show} clicked={props.modalRemove}/>
            <div className={Classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                {props.children}
            </div>   
        </Aux>     
    );
}
export default modal;