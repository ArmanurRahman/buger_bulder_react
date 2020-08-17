import React from 'react';
import Classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    let inputClasses = [Classes.InputElement]

    if(props.valid && props.touch){
        inputClasses.push(Classes.Invalid)
    }
    switch(props.elemantType){
        case("input"):
        
            inputElement = <input className={inputClasses.join(' ')}{...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ("textarea"):
            inputElement = <textarea className={inputClasses.join(' ')}{...props.elementConfig} value={props.value} onChange={props.changed}/>
            break;
        case ("select"):
            inputElement = <select
            className={Classes.InputElement}
            value={props.value}
            onChange={props.changed}>
                {
                    props.elementConfig.options.map( option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))
                }
            </select> 
            break;       
        default:
            inputElement = <input className={inputClasses.join(' ')}{...props.elementConfig} value={props.value} onChange={props.changed}/>
    }

    return(
        <div className={Classes.Input}>
            <label className={Classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )

}
export default input;