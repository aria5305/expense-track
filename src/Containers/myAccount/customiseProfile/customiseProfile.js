import React, {Component} from 'react'; 
import classes from './customiseProfile.module.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../Components/UI/button/button'
import Input from '../../../Components/UI/input/input';

const customiseProfile = (props) => {

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
                        
                        <Input />
                    </div>
                    </div>
                    
                    <div className={classes.subContainer}>
                    <div className={classes.details}>
                        <h5>Avatar Image</h5>
                        <p>Images must be .png or .jpg format</p>
                        
                        <Input />
                    </div>


                    </div>
                    <Button>Save changes</Button>
                </div>
            </div>
        </div>
    )

}

export default customiseProfile;