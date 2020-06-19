import React from 'react';
import BackDrop from '../../UI/backdrop/backdrop'
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Drawer.module.css';
import Aux from '../../../hoc/Aux'
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

                <nav>
                    <NavigationItems isAuth={props.isAuth} clicked={props.closed}/>
                </nav>
                
            </div>

        </Aux>
    )

}


export default sideDrawer;