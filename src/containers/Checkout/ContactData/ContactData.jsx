import React,{  useState } from "react";
import Button from '../../../components/UI/Button/Button'
import Classes from './ContactData.module.css'
import axiosInstance from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input'
import { connect } from "react-redux";
import * as action from '../../../Store/action/index'

const ContractData = props =>{
    const [orderForm, setOrderForm] = useState(
        {
            name: {
                elemantType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validationRules: {
                    isRequired: true,
                },
                valid: false,
                touch: false,
            },
            email: {
                elemantType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validationRules: {
                    isRequired: true,
                },
                valid: false,
                touch: false,
            },
            zipCode: {
                elemantType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'zipcode'
                },
                value: '',
                validationRules: {
                    isRequired: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            city: {
                elemantType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'city'
                },
                value: '',
                validationRules: {
                    isRequired: true,
                },
                valid: false,
                touch: false,
            },
            counrty: {
                elemantType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: '',
                validationRules: {
                    isRequired: true,
                },
                valid: false,
                touch: false,
            },
            deliveryMethod: {
                elemantType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
                validationRules: {},
                value: 'fastest',
                touch: false,
                valid: true
            },      
                           
        }
    )
    const [formValid, setFormValid] = useState(false)
        

    const orderHandler = (event) => {
        event.preventDefault();
        let formData =  {}        
        for(let formdataElement in orderForm){
            formData[formdataElement] = orderForm[formdataElement].value
        }

        const order = {
            ingrediants: props.ingrediants,
            totalPrice : props.price,
            contactData: formData,
            userId: props.userId
        }        
        props.onOrderBarger(order, props.token)
    }

    const checkValidity = (value, rules) => {
        
        let isValid = true;
        if(rules.isRequired){
            isValid = value.trim() != '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.minLength && isValid
        }
        return isValid
        
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedOrderForm = {
            ...orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validationRules)
        updatedFormElement.touch = true
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let fornIsValid = true
        for(let inputIdentifier in updatedOrderForm){
            fornIsValid = updatedOrderForm[inputIdentifier].valid && fornIsValid
        }
        setOrderForm(updatedOrderForm)
        setFormValid(fornIsValid)        
    }

        const formatElementArray = []
        for(let key in orderForm){
            formatElementArray.push({
                id: key,
                config: orderForm[key]
            })
        }
        let form = <form onSubmit={orderHandler}>
            {formatElementArray.map(formElement => (
                <Input
                key={formElement.id}
                elemantType={formElement.config.elemantType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                valid={!formElement.config.valid}
                touch={formElement.config.touch}
                changed={(event) => inputChangedHandler(event, formElement.id)}/>
            ))}

        <Button  btnType='Success' disable={!formValid}>ORDER</Button>    
        </form>

        if(props.loading){
            form = <Spinner />
        }
        return(
            <div className={Classes.ContactData}>
                <h4>Enter your contact here</h4>
                {form}
            </div>
        )
}

const mapStateToProps = state => {
    return{
        ingrediants: state.burgerBuilder.ingrediant,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBarger: (orderData, token) => dispatch(action.purchaseBurger(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContractData, axiosInstance));