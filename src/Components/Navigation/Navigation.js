import React from 'react'
import classes from './Navigation.module.css'
import Logo from '../logo/logo'
import DrawerToggle from './Drawer/DrawerToggle/DrawerToggle'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavigationItems from './NavigationItems/NavigationItems'
const Navigation = (props) => (

    
 
    <header className={classes.Header}>
        <DrawerToggle clicked={props.clicked}></DrawerToggle>
            <div>
                <Logo />
            </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}></NavigationItems>
        </nav>
    </header>



)
export default Navigation 