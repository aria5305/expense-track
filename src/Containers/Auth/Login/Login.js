import React, { Component } from 'react'
import classes from './Login.module.css';
import Auth from '../Auth';
import * as actions from '../../../store/action/index';
import {connect} from 'react-redux';


//look at Auth page from hamburger builder


class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
           controls:{
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your email address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false,
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false,
            },
           },
          }
    }


    signInHandler = (event) => {
        event.preventDefault(); 
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value);
        // this.props.onSetAuthRedirectPath();
    }

    
    render(){
     
   
        return (     
            
             <div className={classes.container}>
                
                <div className={classes.form}>
                    <Auth isLogin btnText="Sign in" isSignup={false}>
                        <h1 className={classes.formHeading}>
                            Sign into your account
                        </h1>
                       
                    </Auth>
                   
                  </div>
                  </div>
          

        )
    }
}

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,//looking at what the authReducer via Rootreducer in index.js
        error:state.auth.error,
        isAuth:state.auth.isAuth,
        authRedirect:state.auth.authRedirect

    }

}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login); 