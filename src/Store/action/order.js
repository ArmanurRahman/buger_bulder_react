import * as actionType from './actionType'
import axiosInstance from '../../axios-order';
import { fetchIngredientFail } from './burgerBuilder';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return{
        type:actionType.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return{
        type: actionType.PURCHASE_BARGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axiosInstance.post('/order.json?auth='+token, orderData)
        .then((response) => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        }
            
        ).catch(error => {
            dispatch( purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit = () => {
    return{
        type: actionType.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return{
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return{
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return{
        type: actionType.FETCH_ORDERS_START
    }
}

export const fetchOrder = (token) => {
    
    return dispatch => {
        dispatch(fetchOrderStart())
        axiosInstance.get('order.json?auth='+token)
        .then(res => {
            let fetchOrders = [];
            
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                id:key})
            }
            dispatch(fetchOrderSuccess(fetchOrders))
            
        })
        .catch(error => {
            dispatch(fetchIngredientFail(error))
        })        
    }
}