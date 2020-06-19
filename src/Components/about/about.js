import React, { Component } from 'react'
import classes from './about.module.css';
import Aux from '../../hoc/Aux';
import image from '../../assets/images/undraw_next_tasks_iubr.svg'
import image2 from '../../assets/images/undraw_studying_s3l7.svg'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../UI/button/button';
import Modal from '../UI/modal/modal'; 
import {Link} from 'react-router-dom';
import Auth from '../../Containers/Auth/Auth';
import {connect} from 'react-redux';
import * as actions from '../../store/action/index';
import catPic from '../../assets/images/undraw_finance_0bdk.svg'

class about extends Component{
  


    render(){

    return (
        <Aux>
        <div className={classes.aboutIntro}>
            <h1 className={classes.heading}>Say goodbye to budgeting books </h1>
        </div>

        <div className={classes.introContainer}>
          

        <div className={classes.description}>
           <img className={classes.image } alt="manWithComputer" src={image}></img>
            
            <div className={classes.desContainer}>
                <h3 className={classes.subheading}>Repeated “Lorem ipsum"</h3>
                <p className={classes.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, augue nec placerat pharetra, lacus metus pretium neque, sed molestie erat dolor at purus. Nulla sollicitudin enim ut tincidunt euismod. Phasellus interdum tellus at semper lobortis. Nullam lectus dolor, viverra non tempus ac, venenatis sit amet augue. Donec arcu nisi, ultricies vel enim nec, lobortis mattis nunc. Mauris faucibus purus et tortor venenatis, vitae venenatis quam blandit. Curabitur urna elit, gravida sed lorem quis, bibendum congue eros. Morbi vestibulum fringilla rutrum. Ut nulla felis, accumsan a magna in, molestie iaculis felis. Donec vehicula sollicitudin nunc, dictum eleifend turpis mattis a. Phasellus congue aliquam suscipit. Vestibulum a mi neque. Nam maximus a metus nec pretium. Morbi efficitur justo massa, sed blandit velit dapibus vitae.
                </p>
            </div>
        </div>
       

        <div className={classes.description}>
            <div className={classes.desContainer}>
                    <h3 className={classes.subheading}>Repeated “Lorem ipsum"</h3>
                    <p className={classes.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus, augue nec placerat pharetra, lacus metus pretium neque, sed molestie erat dolor at purus. Nulla sollicitudin enim ut tincidunt euismod. Phasellus interdum tellus at semper lobortis. Nullam lectus dolor, viverra non tempus ac, venenatis sit amet augue. Donec arcu nisi, ultricies vel enim nec, lobortis mattis nunc. Mauris faucibus purus et tortor venenatis, vitae venenatis quam blandit. Curabitur urna elit, gravida sed lorem quis, bibendum congue eros. Morbi vestibulum fringilla rutrum. Ut nulla felis, accumsan a magna in, molestie iaculis felis. Donec vehicula sollicitudin nunc, dictum eleifend turpis mattis a. Phasellus congue aliquam suscipit. Vestibulum a mi neque. Nam maximus a metus nec pretium. Morbi efficitur justo massa, sed blandit velit dapibus vitae.
                    </p>
                </div>
           <img className={classes.image} alt="womanWritingonBook"src={image2}></img>
            
           
        </div>
        </div>
        

    <div className={classes.plans}>
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={classes.wave}>
            <path fill="var(--red)" fillOpacity="1" d="M0,64L80,96C160,128,320,192,480,192C640,192,800,128,960,106.7C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
            <h1 className={classes.planHeading}>Plans</h1>
            <div className={classes.plansContainer}>
                <div>
                    <FontAwesomeIcon className={classes.FontAwesome} icon="plane-departure"></FontAwesomeIcon>
                    <h3 className={classes.planSubheading}>Basic</h3>
                    <p className={classes.paragraph}>"Neque porro quisquam est qu"</p>
                    <ul className={classes.planList}>
                        <li className={classes.listItem}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li className={classes.listItem}>Mauris id justo ut odio eleifend scelerisque.</li>
                        <li className={classes.listItem}>Pellentesque in odio a elit convallis ultricies.</li>
                    </ul>
                    <Button clicked={this.props.onShowModal}>See more</Button>
                </div>
                
                <div>
                <FontAwesomeIcon className={classes.FontAwesome} icon="user-plus"></FontAwesomeIcon>
                    <h3 className={classes.planSubheading}>Mid-range</h3>
                    <p className={classes.paragraph}>"Neque porro quisquam est qui dolorem ipsum quia dolor sit am."</p>
                    <ul className={classes.planList}>
                        <li className={classes.listItem}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li className={classes.listItem}>Mauris id justo ut odio eleifend scelerisque.</li>
                        <li className={classes.listItem}>Pellentesque in odio a elit convallis ultricies.</li>
                        <li className={classes.listItem}>In quis diam sit amet felis ultricies tempor.</li>
                        <li className={classes.listItem}>Fusce non purus sit amet quam blandit faucibus vitae ut arcu.</li>
                    </ul>
                    <Button clicked={this.props.onShowModal}>See more</Button>
                </div>
                
                <div>
                <FontAwesomeIcon className={classes.FontAwesome} icon="frog"></FontAwesomeIcon>
                    <h3 className={classes.planSubheading}>Premium</h3>
                    <p className={classes.paragraph}>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</p>
                    <ul className={classes.planList}>
                    <li className={classes.listItem}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li className={classes.listItem}>Mauris id justo ut odio eleifend scelerisque.</li>
                        <li className={classes.listItem}>Pellentesque in odio a elit convallis ultricies.</li>
                        <li className={classes.listItem}>In quis diam sit amet felis ultricies tempor.</li>
                        <li className={classes.listItem}>Fusce non purus sit amet quam blandit faucibus vitae ut arcu.</li>

                        <li className={classes.listItem}>Duis lobortis leo aliquet tincidunt malesuada.</li>
                        <li className={classes.listItem}>Proin tincidunt erat non massa vehicula venenatis.</li>
                        <li className={classes.listItem}>Praesent a nisl nec arcu auctor blandit eu a nunc.</li>
                        
                    </ul>
                    <Button clicked={this.props.onShowModal}>See more</Button>
                </div>

            </div>
         
    </div>

        <Modal 
                color ="white"
                show={this.props.showModal}
                modalClosed={this.props.onHideModal}>
                
                <div className={classes.container}>
                    <img src={catPic} className={classes.pic} alt="signupImage"/>
                  <Auth btnText= "Sign up">
                    <h1 className={classes.formHeading}>Welcome to bugetting without headaches</h1>
                    <p className={classes.hint}>Already sign up? Click <Link to='/login'>here</Link> to login instead</p>
                  </Auth>
                    {/* {orderSummary} */}
                </div>
            
                </Modal>
        </Aux>   
        )
    }
}



const mapStateToProps = state => {
    return {
      showModal:state.auth.showModal
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
       onShowModal: () => dispatch(actions.showModal()),
       onHideModal:() => dispatch(actions.hideModal())
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(about);