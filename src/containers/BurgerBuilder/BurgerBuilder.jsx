import React, {Component } from 'react';
import Aux from '../../hoc/Auxalary'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component{

    state = {
        ingrediant:{
            'Meat' : 2,
            'Cheese' : 1,
            'Salad':1,
            'Bacon':1
        }
    }    
    render(){
        return(
            <Aux>
                <Burger ingrediants={this.state.ingrediant}/>
                <div>Build Controller</div>
            </Aux>
        );
    };
};

export default BurgerBuilder;