import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact >Home</NavigationItem>
      {(!props.isAuth) ? <NavigationItem link='/about'>About</NavigationItem> :null}
      {(props.isAuth) ? <NavigationItem link='/myaccount'>My Account</NavigationItem> :null}
      {(props.isAuth) ? <NavigationItem link='/myapp'>My App</NavigationItem> :null}
      {(!props.isAuth) ? <NavigationItem link='/login'>Login</NavigationItem> :null}
      {(!props.isAuth) ? <NavigationItem link='/signup'>Sign up</NavigationItem> : 
       <NavigationItem link='/logout'>Logout</NavigationItem>}
      
    </ul>

)

export default navigationItems; 