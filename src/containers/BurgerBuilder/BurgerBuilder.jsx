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
import * as actionType from '../../Store/action'


class BurgerBuilder extends Component{
    
    state = {
        puschasing : false,
        loading : false,
        error : false, 
    }    


    componentDidMount(){
        /*
        axiosInstance.get('https://my-burger-react-b4859.firebaseio.com/ingrediants.json')
        .then(response =>{
            this.setState({ingrediant : response.data})
        }).catch(error => {
            this.setState({error : true})
        })
        */
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




        let burger = this.state.error ? <p> Ingrediant can not load</p> : <Spinner /> ;
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
        if(this.state.loading){
            orderSummery = <Spinner />
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
        ings: state.ingrediant,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngrediantAdded: (ingName) => dispatch({type: actionType.ADD_INGREDIANT, ingrediantName: ingName}),
        onIngrediantRemoved: (ingName) => dispatch({type: actionType.REMOVE_INGREDIANT, ingrediantName: ingName})
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axiosInstance));