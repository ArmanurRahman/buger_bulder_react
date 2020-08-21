import React, { useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../Store/action/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

const Auth = props =>{
    const [controls, setControls] = useState(
        {
            email: {
                elemantType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validationRules: {
                    isRequired: true,
                    isEmail: true
                },
                valid: false,
                touch: false,
            },
            password: {
                elemantType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validationRules: {
                    isRequired: true,
                    minLength: 6
                },
                valid: false,
                touch: false,
            }            
        }
    )
    const [isSignUp, setIsSignUp] = useState(true)


    useEffect(() => {
        if(!props.buildingBurger && props.authRedirectPath !== '/'){
            props.onSetAuthRedirectPath()
        }
    }, [])
    const checkValidity = (value, rules) => {
        
        let isValid = true;
        if (!rules) {
            return true;
        }
        if(rules.isRequired){
            isValid = value.trim() != '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.minLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }        
        return isValid
        
    }

    const inputChangedHandler = (event, controlName) => {
        
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validationRules),
                touch: true
            }
        };
        setControls(updatedControls)
        
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp)
    }

    const switchSingUpHandler = () => {
        setIsSignUp(!isSignUp)
    }
        let error = null;
        if(props.error){
            error = <p> {props.error.message}</p>
        }
        let authRedirect = null;
        if(props.isAuthinticated){
            authRedirect = <Redirect to={props.authRedirectPath} />
        }
        let form = <Spinner />
        const formatElementArray = []
        for(let key in controls){
            formatElementArray.push({
                id: key,
                config: controls[key]
            })
        }
        if(!props.loading){
            form = (<form onSubmit={onSubmitHandler}>
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
    
                <Button  btnType='Success' >SUBMIT</Button>    
            </form>)
        }
        
        return( 
            <div className={classes.Auth}>
                {authRedirect}
                {error}
                {form}
                <Button  btnType='Danger' clicked={switchSingUpHandler} >SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>    
            </div>
        )
    }


const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthinticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.burgerBuilder,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Auth)