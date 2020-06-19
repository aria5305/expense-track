import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
      <NavigationItem close={props.clicked} link='/' exact ><FontAwesomeIcon className={classes.FontAwesome} icon="igloo"/><p>Home</p></NavigationItem>
      {(!props.isAuth) ? <NavigationItem close={props.clicked} link='/about'><FontAwesomeIcon className={classes.FontAwesome} icon="box"/> <p>About</p></NavigationItem> :null}
      {(props.isAuth) ? <NavigationItem close={props.clicked} link='/myaccount'><FontAwesomeIcon className={classes.FontAwesome} icon="id-card-alt"/> <p>My Account</p></NavigationItem> :null}
      {(props.isAuth) ? <NavigationItem close={props.clicked} link='/myapp'><FontAwesomeIcon className={classes.FontAwesome} icon="money-check-alt"/> <p>My App</p></NavigationItem> :null}
      {(!props.isAuth) ? <NavigationItem close={props.clicked} link='/login'><FontAwesomeIcon className={classes.FontAwesome} icon="sign-in-alt"/> <p>Login</p></NavigationItem> :null}
      {(!props.isAuth) ? <NavigationItem close={props.clicked} link='/signup'><FontAwesomeIcon className={classes.FontAwesome} icon="user-plus"/><p>Sign up</p></NavigationItem> : 
       <NavigationItem close={props.clicked} link='/logout'><FontAwesomeIcon className={classes.FontAwesome} icon="sign-out-alt"/>Logout</NavigationItem>}
      
    </ul>

)

export default navigationItems; 