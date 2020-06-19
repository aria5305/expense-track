import React from 'react'; 
import classes from './Logo.module.css';

import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const logo = (props) => {
    return (
       
     <div className={classes.flex}>
        <FontAwesomeIcon className={classes.FontAwesome} icon="wallet"></FontAwesomeIcon>
        <h1 className={classes.siteName}>ExpenseTrack</h1>
    </div>
       
    )
}


export default logo;