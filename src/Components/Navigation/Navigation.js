import React from 'react'
import classes from './Navigation.module.css'
import Logo from '../logo/logo'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavigationItems from './NavigationItems/NavigationItems'
const Navigation = (props) => (

    <header className={classes.Toolbar}>
    
            <div className={classes.Logo}>
                <Logo/>
            
            </div>

        <nav>
           <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>

)
export default Navigation 