import React, {Component} from 'react'; 
import classes from './UpdateEmail.module.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../../Components/UI/button/button';
import {connect} from 'react-redux';
import Aux from '../../../../hoc/Aux';
import Modal from '../../../../Components/UI/modal/modal';
import * as actions from '../../../../store/action/index';
import * as firebase from "firebase/app";
import "firebase/auth";
import Input from '../../../../Components/UI/input/input';
import {checkValidity} from '../../../../share/utility';
import {Redirect} from 'react-router-dom'

class UpdateEmail extends Component{
    constructor(props){
        super(props)
        this.state = {
          
            controls:{
           
             password: {
                 elementType:'input',
                 elementConfig:{
                     type:'password',
                     placeholder:'current password'
                 },
                 value:'',
                 validation:{
                     required:true,
                     minLength:6
                 },
                 valid:false,
                 touched:false,
             },
             email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'new email address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false,
            },
            },
           
         }
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


        
        let error = null; 
        let authRedirect = null; 

        if(this.props.updateSuccess) {
          
            authRedirect = <Redirect to={this.props.authRedirect} />
        }

        if(this.props.error) {
            error = this.props.error
        }
    

        console.log(this.props.method);

        return (
     
        <div className={classes.container}>
            <div className={classes.subCon}>
                <h1 className={classes.heading}><FontAwesomeIcon className={classes.FontAwesomeIcon} icon="envelope-square"></FontAwesomeIcon>Update your email</h1>
                <p>Update your email below.There will be a new verification email sent that you will need to use to verify this new email. </p>
                {form}
                {error}
                    <Button btnType="right" 
                    
                    disabled={
                        !this.state.controls.password.valid && !this.state.controls.email.valid
                    }>
                        Save Emails</Button>
            </div>
            {authRedirect}
      
        </div>)
    }

}




const mapStateToProps = state => {
    return {
        loading:state.auth.loading,//looking at what the authReducer via Rootreducer in index.js
        error:state.auth.error,
        updateSucess:state.auth.updateSucessful,
        authRedirect:state.auth.authRedirect
    }

}
const mapDispatchToProps = dispatch => {
    return {
    //   onUpdate : (email,method) => dispatch(actions.updateMethod(email,method))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateEmail)