import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../Store/action/index'
import {connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component{


    componentDidMount(){
        this.props.onFetchOrders();
    }
    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders =  (<div>
            {this.props.orders.map(order => (
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
}
const mapStateToProps = (state) => {
    return{
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders : () => dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios))