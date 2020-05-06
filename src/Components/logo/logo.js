import React from 'react'; 
import classes from './Logo.module.css';
import Aux from '../../hoc/Aux'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const logo = (props) => {
    return (
       
     <Aux>
        <FontAwesomeIcon className={classes.FontAwesome} icon="wallet"></FontAwesomeIcon>
        <h1 className={classes.siteName}>ExpenseTrack</h1>
    </Aux>
       
    )
}


export default logo;