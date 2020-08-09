import React, {Component } from 'react';
import Aux from '../../hoc/Auxalary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import PurchaseSummary from '../../components/Burger/PurchaseSummary/PurchaseSummary'
import Modal from '../../components/UI/Modal/Modal'
import axiosInstance from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIANT_PRICE = {
    'Meat' : 0.5,
    'Cheese' : 0.4,
    'Salad': 1.3,
    'Bacon': 0.7    
}

class BurgerBuilder extends Component{
    
    state = {
        ingrediant:null,
        totalPrice : 4,
        purchaseStatus : false,
        puschasing : false,
        loading : false,
        error : false, 
    }    


    componentDidMount(){
        axiosInstance.get('https://my-burger-react-b4859.firebaseio.com/ingrediants.json')
        .then(response =>{
            this.setState({ingrediant : response.data})
        }).catch(error => {
            this.setState({error : true})
        })
    }
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

    updatePurchaseStatus = (updateIngrediants) => {
        const sum = Object.keys(updateIngrediants)
        .map(igkey => {
            return updateIngrediants[igkey]
        }).reduce((sum, el) => {
            return sum += el;
        }, 0);

        this.setState({purchaseStatus : sum > 0})
    }

    purchaseHandler = () => {
        this.setState({puschasing : true});
    }

    cancelParchaseHandler = () => {        
        this.setState({puschasing : false});
    }

    continueParchaseHandler = () => {
 

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
    }

    render(){

        const desabledInfo = {...this.state.ingrediant};
        for(let key in desabledInfo){
            desabledInfo[key] = desabledInfo[key] <= 0;
        }




        let burger = this.state.error ? <p> Ingrediant can not load</p> : <Spinner /> ;
        let orderSummery = null;
        if(this.state.ingrediant != null){
            burger = (
                <Aux>
                    <Burger ingrediants={this.state.ingrediant}/>
                    
                    <BuildControls 
                        ingrediantAdd={this.addIngrediantHandler}
                        ingrediantRemove={this.removeIngrediantHandler}
                        disable={desabledInfo}
                        price={this.state.totalPrice}
                        purchaseStatus={this.state.purchaseStatus}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummery = <PurchaseSummary ingrediants={this.state.ingrediant}
            cancelParchase={this.cancelParchaseHandler}
            continueParchase={this.continueParchaseHandler}
            price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axiosInstance);