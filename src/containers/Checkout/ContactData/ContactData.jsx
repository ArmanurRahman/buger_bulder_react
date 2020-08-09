import React,{  Component } from "react";
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.module.css'
import axiosInstance from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContractData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            city: '',
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true})
        const order = {
            ingrediants: this.props.ingrediants,
            totalPrice : this.props.price,
            Customer : {
                name: 'Mubeen',
                address: {
                    street: 'test street',
                    city: 'Tokyo',
                    country: 'Japan'
                },
                email: 'test@gmail.com'
            },
            deleberyMethod: 'fastest',
            
        }
        axiosInstance.post('/order.json', order)
        .then((response) => {
            this.setState({loading:false})
            //console.log(response);
            this.props.history.push('/');
        }
            
        ).catch(error => {
            console.log(error)
        })
    }
    render(){

        let form = <form>
        <input className={Classes.Input} type='text' name='name' placeholder='Your Name'/>
        <input className={Classes.Input} type='text' name='email' placeholder='Your email'/>
        <input className={Classes.Input} type='text' name='street' placeholder='street'/>
        <input className={Classes.Input} type='text' name='city' placeholder='City'/>
        <Button clicked={this.orderHandler} btnType='Success'>ORDER</Button>    
        </form>

        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={Classes.ContactData}>
                <h4>Enter your contact here</h4>
                {form}
            </div>
        )
    }
}

export default ContractData;