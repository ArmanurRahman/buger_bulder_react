import React, {useEffect} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../Store/action/index'
import {connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'


const Orders = props => {

    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
    }, [])

    
        let orders = <Spinner />
        if(!props.loading){
            orders =  (<div>
            {props.orders.map(order => (
                <Order key={order.id} price={order.totalPrice} ingrediants={order.ingrediants}/>
        ))}
        </div>)
        }

        return(
            <div>
                {orders}
            </div>
        )
        
    }

const mapStateToProps = (state) => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders : (token, userId) => dispatch(actions.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios))