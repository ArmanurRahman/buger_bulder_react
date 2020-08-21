import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxalary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import PurchaseSummary from '../../components/Burger/PurchaseSummary/PurchaseSummary'
import Modal from '../../components/UI/Modal/Modal'
import axiosInstance from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { useSelector, useDispatch} from 'react-redux'
import * as burgerBuilderActions from '../../Store/action/index'


const BurgerBuilder = props => {
    
    const [puschasing, setPurchase] = useState(false)



    const dispatch = useDispatch()

    const ings = useSelector(state => state.burgerBuilder.ingrediant);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthinticated = useSelector(state => state.auth.token !== null);


    const onIngrediantAdded = (ingName) => dispatch(burgerBuilderActions.addIngrediant(ingName));
    const onIngrediantRemoved = (ingName) => dispatch(burgerBuilderActions.removeIngrediant(ingName));
    const onInitIngrediant = useCallback(() => dispatch(burgerBuilderActions.initIngridaints()), [dispatch]);
    const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngrediant()
    }, [onInitIngrediant])
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
    const updatePurchaseStatus = (updateIngrediants) => {
        const sum = Object.keys(updateIngrediants)
        .map(igkey => {
            return updateIngrediants[igkey]
        }).reduce((sum, el) => {
            return sum += el;
        }, 0);
        return sum>0
        //this.setState({purchaseStatus : sum > 0})
    }

    const purchaseHandler = () => {
        if(isAuthinticated){
            setPurchase(true);
        }else{
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const cancelParchaseHandler = () => {        
        setPurchase(false);
    }

    const continueParchaseHandler = () => {
        onInitPurchase()
        props.history.push('checkout');
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


        const desabledInfo = {...ings};
        for(let key in desabledInfo){
            desabledInfo[key] = desabledInfo[key] <= 0;
        }




        let burger = error ? <p> Ingrediant can not load</p> : <Spinner /> ;
        let orderSummery = null;
        if(ings != null){
            burger = (
                <Aux>
                    <Burger ingrediants={ings}/>
                    
                    <BuildControls 
                        ingrediantAdd={onIngrediantAdded}
                        ingrediantRemove={onIngrediantRemoved}
                        disable={desabledInfo}
                        price={totalPrice}
                        purchaseStatus={updatePurchaseStatus(ings)}
                        ordered={purchaseHandler}
                        isAuthinticated={isAuthinticated}
                    />
                </Aux>
            )
            orderSummery = <PurchaseSummary ingrediants={ings}
            cancelParchase={cancelParchaseHandler}
            continueParchase={continueParchaseHandler}
            price={totalPrice}
            />            
        }

        return(
            <Aux>
                <Modal show={puschasing} 
                    modalRemove={cancelParchaseHandler}
                    showSpinner={puschasing}
                    >
                    {orderSummery}
                </Modal>                
                {burger}
                
            </Aux>
        );
    };




export default withErrorHandler(BurgerBuilder, axiosInstance);