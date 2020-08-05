import React from 'react';
import Classes from './Burger.module.css';
import BurgerIngrediant from './BurgerIngrediant/BurgerIngrediant'

const burger = (props) => {
    let transferIngrediant = Object.keys(props.ingrediants)
    .map(igKey => {
        return [...Array(props.ingrediants[igKey])].map((_, i) => {
            return <BurgerIngrediant key={igKey + i} type={igKey}/>
        }); 
    });

    //console.log(transferIngrediant);
    return (
        <div className={Classes.Burger}>            
        <BurgerIngrediant type='bread-top'/>
        {transferIngrediant}
        <BurgerIngrediant type='bread-bottom'/>        
    </div>

    );
}

export default burger;