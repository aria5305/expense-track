import React, {Component} from 'react'; 
import classes from './myAccount.module.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountSettings from './accountSetting/accountSetting';
import CutomiseProfile from './customiseProfile/customiseProfile'

class MyAccount extends Component{

        constructor(props){
                super(props)
                this.state= { 
                        currentActive:true
                }
        }
        render(){
        return (
        <div className={classes.container}>
           <h1 className={classes.heading}><FontAwesomeIcon icon="cogs" className={classes.FontAwesomeIcon}></FontAwesomeIcon> Account Setup </h1>




            <AccountSettings/>
            <CutomiseProfile />


        </div>
        )
    
}
}


export default MyAccount;
