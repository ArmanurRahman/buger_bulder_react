import React from 'react';
import Aux from '../../../hoc/Auxalary'
import Button from '../../UI/Button/Button'

const purchaseSummary = (props) => {

    const ingrediantSummary = Object.keys(props.ingrediants)
    .map(igkey =>{
        return <li key={igkey}> {igkey} : {props.ingrediants[igkey]}</li>;
    }); 

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingrediants:</p>
            <ul>{ingrediantSummary}</ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Want to continue?</p>
            <Button btnType='Success' clicked={props.continueParchase}>CONTINUE</Button>
            <Button btnType='Danger' clicked={props.cancelParchase}>Cancel</Button>            
        </Aux>
    )
}
export default purchaseSummary;