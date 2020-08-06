import React from 'react';
import Classes from './BackDrop.module.css'

const backDrop = (props) => {
    let bd = null;
    if(props.show){
        bd = <div className={Classes.BackDrop}
        onClick={props.clicked}
        ></div>
    }
    
    return bd;
}

export default backDrop;