import React, {Component} from 'react'; 
import classes from './accountSetting.module.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../Components/UI/button/button';
import {connect} from 'react-redux';
import Aux from '../../../hoc/Auxillary';
import Modal from '../../../Components/UI/modal/modal';
import * as actions from '../../../store/action/index';
import ChangePassword from './ChangePassword/ChangePassword';
import UpdateEmail from './UpdateEmail/UpdateEmail'; 
import Deactive from './Deactive/Deactive';

class AccountSetting extends Component {

    constructor(props){
        super(props)
        this.state ={
            currentmodal: null,
           
        }
    }

    saveCurrentModal = (event) => {
        this.props.onShowModal();
        this.setState({
            currentmodal:event.target.id
        })
    }

    render(){

    
       
      
    return (
        <Aux>
          
            <div className={classes.container}>
                <h1 className={classes.heading}>Account Settings</h1>

                <div>
                    <h4 className={classes.subheading}>account perferences</h4>

                    <div>
                        <div className={classes.subContainer}>
                        <div className={classes.details}>
                            <h5>Email Address</h5>
                            {this.props.email}
                        </div>
                        <Button btnType="accountChanges" id="updateEmail" clicked={ (event) => 
                          
                        this.saveCurrentModal(event)}>Update Email</Button>
                        </div>

                        <div className={classes.subContainer}>
                            <div className={classes.details}>
                            <h5>Change password</h5>
                            <p>Password must be at least 6 characters long</p>
                            </div>
                        <Button btnType="accountChanges" id="changePassword" clicked={ (event) => 
                        {
                        this.saveCurrentModal(event)}}>Change password</Button>
                        </div>
                    
                    </div>
                    </div>

            

                <div>
                    <h3 className={classes.subheading}>deactive account</h3>

                    <div className={classes.group}>
                    
                        <Button  btnType="accountChanges"id="Deactive" clicked={ (event) => 
                        {
                        this.saveCurrentModal(event)}}>
                            Deactive account<FontAwesomeIcon icon="trash" className={classes.FontAwesomeIcon}></FontAwesomeIcon></Button>
                        <p className={classes.warning}>This is irreversible!</p>
                    </div>
                </div>
            </div>

            <Modal 
            color="white"
            show={this.props.showModal}
            modalClosed={this.props.onHideModal}>
            

                    <div className={classes.Modal_inner}>
                {this.state.currentmodal ==="Deactive" ? <Deactive method="Deactive"/> :null}
                {this.state.currentmodal ==="changePassword" ?  <ChangePassword method="changePassword"/> : null}
                {this.state.currentmodal ==="updateEmail" ? <UpdateEmail method="updateEmail"/> : null}
           
    
                    </div>
            </Modal>
        </Aux>

    )


    }      

}


const mapStateToProps = state => {
    return {
        email:state.auth.email,
        showModal:state.auth.showModal
    }

}

const mapDispatchToProps = dispatch => {
    return {
       onShowModal: () => dispatch(actions.showModal()),
       onHideModal:() => dispatch(actions.hideModal())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(AccountSetting); 