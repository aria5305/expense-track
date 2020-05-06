import React, { Component } from 'react'
import classes from './modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../backdrop/backdrop';

const translate0 = 'translateY(0)';
const translateUp = 'translateY(-100vh)';



class Modal extends Component{

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children
    }
    render(){
        return (
            <Aux>
            <Backdrop 
            show={this.props.show}
            clicked={this.props.modalClosed}
            />
                <div 
                    className={classes.Modal}
                    style={{
                        backgroundColor:this.props.color,
                        transform: (this.props.show) ?  translate0 : translateUp,
                        opacity:this.props.show ? '1' : '0'
                    }}>
                        {this.props.children}
                </div>
    
        </Aux>
        )
    }
}
    
   
// React.memo ( (props) => (//jsx),(prevProps, nextProps) => prevProps.show === nextProps.show || prevProps.children === nextProps.children);
//https://stackoverflow.com/questions/56297351/how-to-use-shouldcomponentupdate-with-react-hooks
//note for React.memo need to tel 

export default Modal;