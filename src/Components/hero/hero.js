import React from 'react';
import Button from '../UI/button/button'
import classes from './hero.module.css'
import {Link} from 'react-router-dom';
const hero = (props) => {

    return(
       
            <div className={classes.content}>
                <h1 className={classes.heading}>Get started tracking your monthly/weekly expenses</h1>
                <h2 className={classes.subheading}>Great tool for budgeting</h2>
                <Button className={classes.btn}><Link to='/about' className={classes.link}>About the product</Link></Button>
            </div>
  
    )
}

export default hero