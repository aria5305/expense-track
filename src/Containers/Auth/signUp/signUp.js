import React from 'react'; 
import classes from './signUp.module.css'; 
import Auth from '../Auth';



const signup = (props) => {

   
    return (
        <div className={classes.container}>
                
        <div className={classes.form}>
            <Auth btnText="Sign up" signup={true}>
                <h1 className={classes.formHeading}>
                    Create your account
                </h1>

            </Auth>
            
          </div>
          </div>
    )
}

export default signup;