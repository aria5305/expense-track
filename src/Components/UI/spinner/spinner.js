import React from 'react'; 
import classes from './spinner.module.css';

const spinner = (prop) => {
    return <div className={classes.loader}>Loading...</div>
}

export default spinner;