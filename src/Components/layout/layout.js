import React, { Component } from 'react';

import classes from './layout.module.css';
import Navigation from '../Navigation/Navigation';
// import Toolbar from '../Navigation/Toolbar/Toolbar'
import Drawer from '../Navigation/Drawer/Drawer';
import {connect} from 'react-redux';

class layout extends Component {

    constructor(props){
        super(props)
        this.state = {
            showSideDrawer:false
        }
    }

    sideDrawerClosedHandler = () => {
        
        this.setState({showSideDrawer:false})
    }
    sideDrawerOpenHandler = () => {
        console.log("hello")
        this.setState( (prevState)=> {
            return { showSideDrawer:!this.state.showSideDrawer}
        })
    }
    render(){
        return(

            <div className={classes.Layout}>
            <div className={classes.Header}>
                <Navigation isAuth={this.props.isAuth} clicked={this.sideDrawerOpenHandler} close={this.sideDrawerClosedHandler}/>
                <Drawer isAuth={this.props.isAuth}open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            </div>
            <main className={classes.Content}>
                    {this.props.children}
            </main>
        </div>
      
       
        )
    }
 
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps,null)(layout);