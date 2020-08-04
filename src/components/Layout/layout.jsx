import React from 'react';
import Aux from '../../hoc/Auxalary';
import Classes from './layout.module.css';


const layout = (props) => (
    <Aux>
        <div> Toolbar, Sidebar, backdrop </div>
        <main className={Classes.Content}>
            {props.children}
        </main>
    </Aux>
    );

export default layout;    