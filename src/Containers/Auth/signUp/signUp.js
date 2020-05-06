import React from 'react'; 
import classes from './signUp.module.css'; 
import Auth from '../Auth';
import * as actions from '../../../store/action/index';
import Spinner from '../../../Components/UI/spinner/spinner';
import {NavLink} from 'react-router-dom'


const signup = (props) => {

    return (
        <div className={classes.container}>
                
        <div className={classes.form}>
            <Auth btnType="Sign up" isSignup>
                <h1 className={classes.formHeading}>
                    Create your account
                </h1>
            </Auth>
            <div className={classes.container2}>
                <NavLink className={classes.links} to='/forgotusername'>Forgot User name</NavLink>
                <NavLink className={classes.links} to='/forgotpassword'>Forgot Password</NavLink>
            </div>
          </div>
          </div>
    )
}

export default signup;