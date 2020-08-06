import React from 'react'
import Classes from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'


const toolbar = (props) => (
    <header className={Classes.Toolbar}>
        <div>MENU</div>
        <Logo></Logo>
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;