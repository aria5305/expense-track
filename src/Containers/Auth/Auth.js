import React, { Component } from 'react'
import classes from './auth.module.css';
import Button from '../../Components/UI/button/button'
import Input from '../../Components/UI/input/input'
import {checkValidity} from '../../share/utility';
import {Redirect} from 'react-router-dom';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actions from '../../store/action/index';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux'
import Spinner from '../../Components/UI/spinner/spinner'
//look at Auth page from hamburger builder


class Auth extends Component{
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


    authHandler = (event) => {
        console.log(this.props.signup)
        event.preventDefault(); 
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.props.isSignup);
        // this.props.onSetAuthRedirectPath();
    }


    
    inputChangedHandler = (event,controlName) => {

        const updatedControlElement = this.state.controls[controlName];
   

        const updatedControl = {
            ...this.state.controls, 
            [controlName]:{
                ...updatedControlElement,
                value:event.target.value,
                valid:checkValidity(event.target.value,updatedControlElement.validation),
                touched:true
            }
        }

        this.setState({controls:updatedControl})
    }

    
    // switchAuthModeHandler = () => {
    //     this.setState( prevState => {
    //         return{isSignUp:!prevState.isSignUp}
    //     })
        
    // }
    render(){

        const formElementsArray = []; 


        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => {
            return (
                <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                />

            )
        })


        
        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null; 
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
                //this message is only avavilable via FireBase
            )
        }

        let authRedirect = null; 

        if(this.props.isAuth) {
            //can either be directed to front page or checkout page
            this.props.onSetAuthRedirectPath('/myaccount')
            authRedirect = <Redirect to={this.props.authRedirect} />
        }

      

      

     

        return (     
                
            <Aux>
                {errorMessage}
                {authRedirect}
            
                <form className={classes.form}
                 onSubmit={(event)=>event.preventDefault()}>
                    {this.props.children}
                     {form}
               <div>

                   
               <Button btnType="Success" clicked={this.authHandler}>
                    {this.props.btnType}
                </Button>


        
              
                </div>
                </form>
            </Aux>

        )
    }
}

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,//looking at what the authReducer via Rootreducer in index.js
        error:state.auth.error,
        isAuth:state.auth.isAuth,
        authRedirect:state.auth.authRedirect,
    }

}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth); 