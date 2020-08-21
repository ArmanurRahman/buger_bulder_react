import React, { useState } from 'react';
import Aux from '../../hoc/Auxalary';
import Classes from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'
import {connect} from 'react-redux'


const Layout = (props) => {

    const [showSidedrawer, setSidedrawer] = useState(false)

    const sidedrawCloseHandler = () => {
        setSidedrawer( false)
    }

    const toggleButtonHandler = () => {
        setSidedrawer( !showSidedrawer)
    }

        
        return (
            <Aux>
            <Toolbar toggleButtonClicked={toggleButtonHandler}
            isAuth={props.isAuthinticate}/>
            <Sidedrawer closed={sidedrawCloseHandler} open={showSidedrawer}
            isAuth={props.isAuthinticate}/>
            <main className={Classes.Content}>
                {props.children}
            </main>
        </Aux>
        )
    
}

const mapStateTpProps = state => {
    return{
        isAuthinticate: state.auth.token !== null
    }
}
export default connect(mapStateTpProps)(Layout) ;    