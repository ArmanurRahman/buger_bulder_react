import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../Store/action/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

class Auth extends Component{
    state = {
        controls: {
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
        },
        isSignUp: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()
        }
    }
    checkValidity(value, rules){
        
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

    inputChangedHandler = (event, controlName) => {
        
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validationRules),
                touch: true
            }
        };
        
        this.setState({controls: updatedControls});
    }
    
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchSingUpHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }
    render(){
        let error = null;
        if(this.props.error){
            error = <p> {this.props.error.message}</p>
        }
        let authRedirect = null;
        if(this.props.isAuthinticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        let form = <Spinner />
        const formatElementArray = []
        for(let key in this.state.controls){
            formatElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        if(!this.props.loading){
            form = (<form onSubmit={this.onSubmitHandler}>
                {formatElementArray.map(formElement => (
                    <Input
                    key={formElement.id}
                    elemantType={formElement.config.elemantType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    valid={!formElement.config.valid}
                    touch={formElement.config.touch}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
    
                <Button  btnType='Success' >SUBMIT</Button>    
            </form>)
        }
        
        return( 
            <div className={classes.Auth}>
                {authRedirect}
                {error}
                {form}
                <Button  btnType='Danger' clicked={this.switchSingUpHandler} >SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>    
            </div>
        )
    }
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