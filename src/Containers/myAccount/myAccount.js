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
       
 
            <AccountSettings/>
         
                //customise Profile - done but decided to take it out - you can still view the code I wrote for this section on Github

        )
    
}
}


export default MyAccount;
