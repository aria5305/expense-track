import React, {Component} from 'react'; 
import classes from './ChangePassword.module.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../../Components/UI/button/button';
import {connect} from 'react-redux';
import Aux from '../../../../hoc/Aux';
import Modal from '../../../../Components/UI/modal/modal';
import * as actions from '../../../../store/action/index';

import Input from '../../../../Components/UI/input/input';
import {checkValidity} from '../../../../share/utility';
import {Redirect} from 'react-router-dom'


class ChangePassword extends Component{
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
             newPassword: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'New password'
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

    updateHandler= (event) => {
        event.preventDefault();
        this.props.onUpdate(this.state.controls.newPassword.value)
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

      

    

        return (
     
        <div className={classes.container}>
            <div className={classes.subCon}>
                <h1 className={classes.heading}><FontAwesomeIcon className={classes.FontAwesomeIcon} icon="envelope-square"></FontAwesomeIcon>Update your Password</h1>
                <p>Update your Password below. You will need to re-login after this using the new Password </p>
               
                <form onSubmit={(event) => event.preventDefault()}>
                    {form}
                    {error}

                    <Button btnType="right" 
                        clicked={this.updateHandler}
                        disabled={
                            !this.state.controls.password.valid && !this.state.controls.newPassword.valid
                        }>
                Change password</Button>
                </form>
              
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
      onUpdate : (password) => dispatch(actions.updatePassword(password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword)