import React, {Component } from 'react';
import Classes from './BurgerIngrediant.module.css';
import PropTypes from 'prop-types';

class BurgerIngredians extends Component{



    render(){
        let ingrediant = null;
        switch(this.props.type){
            case ('bread-bottom'):
                ingrediant = <div className={Classes.BreadBottom}></div>;
                break;
            case 'bread-top':
                ingrediant = (
                    <div className={Classes.BreadTop}>
                        <div className={Classes.Seeds1}></div>
                        <div className={Classes.Seeds2}></div>
                    </div>
                );
                break;
            case 'Meat':
                ingrediant = <div className={Classes.Meat}></div>
                break;
            case 'Cheese':
                ingrediant = <div className={Classes.Cheese}></div>
                break;
            case 'Salad':
                ingrediant = <div className={Classes.Salad}></div>
                break;
            case 'Bacon':
                ingrediant = <div className={Classes.Bacon}></div>
                break;
    
            default:
                ingrediant = null;
        }        
        console.log(Classes.Bacon);
        return ingrediant;

    }

}


BurgerIngredians.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredians;