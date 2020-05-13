import React, {Component} from 'react'; 
// import classes from './accountSetting.module.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../../Components/UI/button/button';
import {connect} from 'react-redux';
import Aux from '../../../../hoc/Aux';
import Modal from '../../../../Components/UI/modal/modal';
import * as actions from '../../../../store/action/index';
import * as firebase from "firebase/app";
import "firebase/auth";
import{ Redirect } from 'react-router-dom';



class Deactive extends Component{
    constructor(props){
        super(props)
        this.state = {
            delete:false
        }
    }

deactiveMethod = () => {
    var user = firebase.auth().currentUser;

    user.delete().then(() => {
    // User deleted.
    alert('your account has been deleted, you will be redirected to the main screen')
    this.props.onClearLoginDetails();
    this.setState({delete:true})

    }).catch((error) =>{
    // An error happened.
    alert(error)
    });
    }
    render(){

        let authRedirect = null; 

        if(this.state.delete) {
          
            authRedirect = <Redirect to='/' />
        }
        return (
        <div>
                <h1>Warning! THIS CAN NOT BE REVERTED!</h1>
                <Button clicked={this.deactiveMethod}>Press here to delete account</Button>
                {authRedirect}
        </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onClearLoginDetails: ()=> dispatch(actions.clearLoginAfterDelete())
    }
}




export default connect(null,mapDispatchToProps)(Deactive)