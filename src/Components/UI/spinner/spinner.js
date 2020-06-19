import React from 'react'; 
import classes from './spinner.module.css';

const spinner = (props) => {

    if(props.class ==="pink"){
    return<div className={[classes.loader, classes.pink].join(' ')}>Loading...</div>
    }else if(props.class ==="yellow"){
    return<div className={[classes.loader, classes.yellow].join(' ')}>Loading...</div>
    }
}

export default spinner;