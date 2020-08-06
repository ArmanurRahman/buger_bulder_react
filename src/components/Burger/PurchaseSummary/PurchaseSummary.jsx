import React from 'react';
import Aux from '../../../hoc/Auxalary'

const purchaseSummary = (props) => {

    const ingrediantSummary = Object.keys(props.ingrediants)
    .map(igkey =>{
        return <li> {igkey} : {props.ingrediants[igkey]}</li>;
    }); 

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingrediants:</p>
            <ul>{ingrediantSummary}</ul>
        </Aux>
    )
}
export default purchaseSummary;