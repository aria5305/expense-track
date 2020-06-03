import React, {Component} from 'react'; 
import classes from './customiseProfile.module.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../Components/UI/button/button'
import Input from '../../../Components/UI/input/input';
import * as firebase from "firebase/app";
import "firebase/auth";
import UploadProfile from './uploadProfile/uploadProfile';

class customiseProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
          
            controls:{
           
             displayName: {
                 elementType:'input',
                 elementConfig:{
                     type:'name',
                     placeholder:'Enter your Display name'
                 },
                 value:'',
                 validation:{
                     required:false,
                     minLength:1
                 },
                 valid:false,
                 touched:false,
             },
            },

                   
         }  
    }
   
    updateUserName = (name) =>{
        var user = firebase.auth().currentUser;

            user.updateProfile({
            displayName: name,
           
            }).then(function() {
                alert('update display name')
            // Update successful.
            }).catch(function(error) {
                alert('failed:', error)
            // An error happened.
            });
    }


    

    render(){
    return (
        <div className={classes.container}>

            <h1 className={classes.heading}>Customise Profile</h1>

            <div>
                <h4 className={classes.subheading}>profile information</h4>

                <div>
                    <div className={classes.subContainer}>
                    <div className={classes.details}>
                        <h5>Display name(optional)</h5>
                        <p>Set a display name. This will be what we refer to you as in the app/emails</p>
                        <span className={classes.small}>Default is "there"</span>
                        
                        <Input /> 
                        <Button btnType="small">Save changes</Button>
                        <Button btnType="small">Change back to default</Button>
                       
                    </div>
                    <div>
                        
                    </div>
                    </div>
                  
                    <div className={classes.subContainer}>
                    <div className={classes.details}>
                        <h5>Avatar Image</h5>
                        <p>Images must be .png or .jpg format</p>
                        <div className={classes.containerPath}>
                        
                        <UploadProfile/>
                        </div>
                       

                    </div>


                    </div>
                   
                </div>
            </div>
        </div>
    )
    }
}

export default customiseProfile;