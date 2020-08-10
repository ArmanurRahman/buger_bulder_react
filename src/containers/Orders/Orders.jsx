import React, {Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{

    state = {
        orders: [],
        loading: false
    }
    componentDidMount(){
        axios.get('order.json')
        .then(res => {
            let fetchOrders = [];
            this.setState({loading: false})
            for(let key in res.data){
                fetchOrders.push({
                    ...res.data[key],
                id:key})
            }
            this.setState({loading: true, orders: fetchOrders})
            console.log(this.state.orders)
        })
        .catch(error => {
            this.setState({loading: false})
        })
    }
    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id} price={order.totalPrice} ingrediants={order.ingrediants}/>
        ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)