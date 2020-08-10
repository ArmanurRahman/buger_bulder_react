import React, { Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component{

    state = {
        ingrediants: {},
        price: 0,
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
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
    render(){
        return(
            <div>
                <CheckoutSummary 
                ingrediants={this.props.ings}
                checkoutCanceled={this.checkoutCancelHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                component={ContactData}/>
            </div>
            
        )
    }
    
}

const mapStatetoProps = state => {
    return{
        ings: state.ingrediant
    }
}
export default connect(mapStatetoProps) (Checkout);