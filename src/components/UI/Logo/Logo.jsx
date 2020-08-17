import React from 'react';
import Classes from './Logo.module.css'
import Logo from '../../../assets/img/burger-logo.png'

const logo = (props) => (
    <div className={Classes.Logo}>
        <img src={Logo} alt='burger'/>
    </div>
);

export default logo;
