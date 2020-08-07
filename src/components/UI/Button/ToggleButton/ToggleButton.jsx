import React from 'react';
import Classes from './ToggleButton.module.css'

const toggleButton = (props) => (
    <div className={Classes.ToggleButton} onClick={props.showDrawer}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default toggleButton