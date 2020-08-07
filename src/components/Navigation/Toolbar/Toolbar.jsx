import React from 'react'
import Classes from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import ToggleButton from '../../UI/Button/ToggleButton/ToggleButton'

const toolbar = (props) => (
    <header className={Classes.Toolbar}>
        <ToggleButton showDrawer={props.toggleButtonClicked}/>
        <div className={Classes.Logo}>
            <Logo/>
        </div>
        <nav className={Classes.Destoponly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;