import React, {Component } from 'react';
import Aux from '../../hoc/Auxalary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import PurchaseSummary from '../../components/Burger/PurchaseSummary/PurchaseSummary'
import Modal from '../../components/UI/Modal/Modal'
import axiosInstance from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect} from 'react-redux'
import * as burgerBuilderActions from '../../Store/action/index'


class BurgerBuilder extends Component{
    
    state = {
        puschasing : false,

    }    


    componentDidMount(){
        this.props.onInitIngrediant()
    }
    /*
    addIngrediantHandler = (type) => {
        const oldCount = this.state.ingrediant[type];
        const updateCount = oldCount + 1;
        const updateIngrediants = {
            ...this.state.ingrediant
        }
        updateIngrediants[type] = updateCount;
        const updatedPrice = this.state.totalPrice + INGREDIANT_PRICE[type];
        this.setState({ingrediant:updateIngrediants, totalPrice:updatedPrice})
        this.updatePurchaseStatus(updateIngrediants);  
    }
    */
/*
    removeIngrediantHandler = (type) => {
        const oldCount = this.state.ingrediant[type];
        const updateCount = oldCount - 1;
        if(updateCount < 0){
            return;
        }
        const updateIngrediants = {
            ...this.state.ingrediant
        }
        updateIngrediants[type] = updateCount;
        const updatedPrice = this.state.totalPrice - INGREDIANT_PRICE[type];
        this.setState({ingrediant:updateIngrediants, totalPrice:updatedPrice})   
        this.updatePurchaseStatus(updateIngrediants);     
    }
*/
    updatePurchaseStatus = (updateIngrediants) => {
        const sum = Object.keys(updateIngrediants)
        .map(igkey => {
            return updateIngrediants[igkey]
        }).reduce((sum, el) => {
            return sum += el;
        }, 0);
        return sum>0
        //this.setState({purchaseStatus : sum > 0})
    }

    purchaseHandler = () => {
        this.setState({puschasing : true});
    }

    cancelParchaseHandler = () => {        
        this.setState({puschasing : false});
    }

    continueParchaseHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('checkout');
/*
        const queryParam = [];
        for(let i in this.state.ingrediant){
            queryParam.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingrediant[i]))
        }
        queryParam.push('price='+this.state.totalPrice);
        const queryString = queryParam.join('&')
        this.props.history.push({
           pathname: 'checkout',
            search: '?'+queryString
       });
       */
    }

    render(){

        const desabledInfo = {...this.props.ings};
        for(let key in desabledInfo){
            desabledInfo[key] = desabledInfo[key] <= 0;
        }




        let burger = this.props.error ? <p> Ingrediant can not load</p> : <Spinner /> ;
        let orderSummery = null;
        if(this.props.ings != null){
            burger = (
                <Aux>
                    <Burger ingrediants={this.props.ings}/>
                    
                    <BuildControls 
                        ingrediantAdd={this.props.onIngrediantAdded}
                        ingrediantRemove={this.props.onIngrediantRemoved}
                        disable={desabledInfo}
                        price={this.props.totalPrice}
                        purchaseStatus={this.updatePurchaseStatus(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummery = <PurchaseSummary ingrediants={this.props.ings}
            cancelParchase={this.cancelParchaseHandler}
            continueParchase={this.continueParchaseHandler}
            price={this.props.totalPrice}
            />            
        }

        return(
            <Aux>
                <Modal show={this.state.puschasing} 
                    modalRemove={this.cancelParchaseHandler}
                    showSpinner={this.state.loading}
                    >
                    {orderSummery}
                </Modal>                
                {burger}
                
            </Aux>
        );
    };
};

const mapStateToProps =(state) => {
    return {
        ings: state.burgerBuilder.ingrediant,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngrediantAdded: (ingName) => dispatch(burgerBuilderActions.addIngrediant(ingName)),
        onIngrediantRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngrediant(ingName)),
        onInitIngrediant: () => dispatch(burgerBuilderActions.initIngridaints()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axiosInstance));