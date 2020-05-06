import React from 'react'; 
import classes from './button.module.css';

//if there's a link, then change to navlink, if not then plain button

const button = (props) => (
    <button 
    id={props.id}
        onClick={props.clicked}
        disabled={props.disabled}
        className={[classes.btn, classes[props.btnType]].join(' ')}>
        {props.children}
    </button>
)

export default button

