import React from 'react';
import Button from '../UI/button/button'
import classes from './hero.module.css'

const hero = (props) => {

    return(
       
            <div className={classes.content}>
                <h1 className={classes.heading}>Get started tracking your monthly/weekly expensesy</h1>
                <h2 className={classes.subheading}>Great tool for budgeting</h2>
                <Button className={classes.btn} link='/about'>About the product</Button>
            </div>
  
    )
}

export default hero