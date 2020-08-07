import React, { Component } from 'react';
import Aux from '../../hoc/Auxalary';
import Classes from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'



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
        return (
            <Aux>
            <Toolbar toggleButtonClicked={this.toggleButtonHandler}/>
            <Sidedrawer closed={this.sidedrawCloseHandler} open={this.state.showSidedrawer}/>
            <main className={Classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }

    
}

export default Layout;    