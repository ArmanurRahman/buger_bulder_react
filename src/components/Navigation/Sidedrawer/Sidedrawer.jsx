import React from 'react'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Classes from './Sidedrawer.module.css'
import Backdrop from '../../UI/BackDrop/BackDrop'
import Aux from '../../../hoc/Auxalary'

const sidewrader = (props) =>{

    let atachedClasses = [Classes.Sidedrawer, Classes.Close]
    if(props.open){
        atachedClasses = [Classes.Sidedrawer, Classes.Open]
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={atachedClasses.join(' ')}>
                <div className={Classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
}

export default sidewrader;