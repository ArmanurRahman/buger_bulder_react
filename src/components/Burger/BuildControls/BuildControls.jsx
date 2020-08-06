import React from 'react';
import Classes from './BuildControls.module.css'
import BuildControl from '../BuildControl/BuildControl'

const controls = [
    {label: 'Meat'},
    {label: 'Cheese'},
    {label: 'Salad'},
    {label: 'Bacon'},    
];

const buildControl = (props) => (
    <div className={Classes.BuildControls}>
        <p> <strong> Total price {props.price.toFixed(2)} </strong></p>
        { controls.map( ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingrediantAdd(ctrl.label)}
                removed={() => props.ingrediantRemove(ctrl.label)}
                disabled = {props.disable[ctrl.label]}
            />
        ))}
        <button 
        className={Classes.OrderButton} 
        disabled={!props.purchaseStatus}
        onClick={props.ordered}
        >CHECK OUT</button>
    </div>
)

export default buildControl;