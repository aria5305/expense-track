import React, {Component} from 'react'; 
import classes from './myAccount.module.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountSettings from './accountSetting/accountSetting';
import CutomiseProfile from './customiseProfile/customiseProfile'

const  MyAccount  = (props) => {

        return (
        <div className={classes.container}>
           <h1 className={classes.heading}><FontAwesomeIcon icon="cogs" className={classes.FontAwesomeIcon}></FontAwesomeIcon> Account Setup </h1>

           <ul className={classes.list}>
                <li><button className={classes.renderLink}>Account</button></li>
                <li><button className={classes.renderLink}>Profile</button></li>
                <li><button className={classes.renderLink}>Logout</button></li>
           </ul>


            <AccountSettings/>
            {/* <CutomiseProfile/> */}


        </div>
        )
    
}


export default MyAccount;
