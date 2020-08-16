import React, { Component } from 'react';
import Aux from '../../hoc/Auxalary';
import Classes from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'
import {connect} from 'react-redux'


class Layout extends Component{

    state = {
        showSidedrawer : false
    }

    sidedrawCloseHandler = () => {
        this.setState( {showSidedrawer : false })
    }

    toggleButtonHandler = () => {
        this.setState((prevState) => {
            return {showSidedrawer : !prevState.showSidedrawer}
        });
    }
    render(){
        console.log(this.props.isAuthinticate)
        return (
            <Aux>
            <Toolbar toggleButtonClicked={this.toggleButtonHandler}
            isAuth={this.props.isAuthinticate}/>
            <Sidedrawer closed={this.sidedrawCloseHandler} open={this.state.showSidedrawer}
            isAuth={this.props.isAuthinticate}/>
            <main className={Classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }

    
}

const mapStateTpProps = state => {
    return{
        isAuthinticate: state.auth.token !== null
    }
}
export default connect(mapStateTpProps)(Layout) ;    