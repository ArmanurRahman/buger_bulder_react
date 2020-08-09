import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import Classes from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {

    return (
        <div className={Classes.CheckoutSummary}>
            <h1>We hope this test well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingrediants={props.ingrediants}/>
            </div>
            <Button
                btnType='Danger'
                clicked={props.checkoutCanceled}>
                CANCEL
            </Button>
            <Button
                btnType='Success'
                clicked={props.checkoutContinued}>
                CONTINUE
            </Button>
        </div>
    );
}

export default CheckoutSummary;