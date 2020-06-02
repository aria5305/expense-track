import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
      <NavigationItem close={props.clicked} link='/' exact >Home</NavigationItem>
      {(!props.isAuth) ? <NavigationItem close={props.clicked} link='/about'>About</NavigationItem> :null}
      {(props.isAuth) ? <NavigationItem close={props.clicked} link='/myaccount'>My Account</NavigationItem> :null}
      {(props.isAuth) ? <NavigationItem close={props.clicked} link='/myapp'>My App</NavigationItem> :null}
      {(!props.isAuth) ? <NavigationItem close={props.clicked} link='/login'>Login</NavigationItem> :null}
      {(!props.isAuth) ? <NavigationItem close={props.clicked} link='/signup'>Sign up</NavigationItem> : 
       <NavigationItem close={props.clicked} link='/logout'>Logout</NavigationItem>}
      
    </ul>

)

export default navigationItems; 