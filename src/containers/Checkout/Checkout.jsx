import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData'
import { connect } from 'react-redux'


const Checkout = props =>{


    const checkoutCancelHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }
/*
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingrediants = {};
        let price = null;
        for(let param of query.entries()){
            if(param[0] == 'price'){
                price = param[1]
            }
            else{
                ingrediants[param[0]] = +param[1];
            }
        }
        //console.log(ingrediants)
        this.setState({ingrediants: ingrediants, price:price})
    }
    */

        let summary = <Redirect to='/' />
        if(props.ings){
            const purchaseRedirect = props.purchased ? <Redirect to='/' /> : null 
            summary = <div>
                {purchaseRedirect}
            <CheckoutSummary 
            ingrediants={props.ings}
            checkoutCanceled={checkoutCancelHandler}
            checkoutContinued={checkoutContinuedHandler}
            />
            <Route path={props.match.path + '/contact-data'} 
            component={ContactData}/>
        </div>
        }
        return summary
    }
    


const mapStatetoProps = state => {
    return{
        ings: state.burgerBuilder.ingrediant,
        purchased: state.order.purchased
    }
}

export default connect(mapStatetoProps) (Checkout);