import React from 'react';
import Classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    
    <ul className={Classes.NavigationItems}>
        <NavigationItem link={'/'} exact>Burger Builder</NavigationItem>
        {props.isAuthindicate ? 
        <NavigationItem link={'/orders'} >Orders</NavigationItem> : null
        }
        
        {props.isAuthindicate ? 
        <NavigationItem link={'/logout'} >Logout</NavigationItem> 
        :<NavigationItem link={'/auth'} >Authenticate</NavigationItem>}
        
    </ul>
)
export default navigationItems;