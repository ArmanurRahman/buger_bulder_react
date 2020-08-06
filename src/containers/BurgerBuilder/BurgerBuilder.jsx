import React, {Component } from 'react';
import Aux from '../../hoc/Auxalary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIANT_PRICE = {
    'Meat' : 0.5,
    'Cheese' : 0.4,
    'Salad': 1.3,
    'Bacon': 0.7    
}

class BurgerBuilder extends Component{
    
    state = {
        ingrediant:{
            'Meat' : 0,
            'Cheese' : 0,
            'Salad':0,
            'Bacon':0
        },
        totalPrice : 4,
        purchaseStatus : false,
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

    render(){

        const desabledInfo = {...this.state.ingrediant};
        for(let key in desabledInfo){
            desabledInfo[key] = desabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Burger ingrediants={this.state.ingrediant}/>
                <BuildControls 
                    ingrediantAdd={this.addIngrediantHandler}
                    ingrediantRemove={this.removeIngrediantHandler}
                    disable={desabledInfo}
                    price={this.state.totalPrice}
                    purchaseStatus={this.state.purchaseStatus}
                />
                
            </Aux>
        );
    };
};

export default BurgerBuilder;