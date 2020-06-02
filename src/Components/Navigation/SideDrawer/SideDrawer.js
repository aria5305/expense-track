import React from 'react';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Auxillary'
const sideDrawer = (props) => {

    // conditionally attach  different css classes 
    //for animations 

    let attachedClasses = [classes.SideDrawer,classes.Closed];

    if(props.open) {
        attachedClasses =[classes.SideDrawer,classes.Open]
    }

    
    return (

        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
     
                <div>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems clicked={props.closed}/>
                </nav>
                
            </div>

        </Aux>
    )

}


export default sideDrawer;