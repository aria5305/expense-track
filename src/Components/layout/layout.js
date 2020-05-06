import React from 'react';
import Aux from '../../hoc/Aux';
// import classes from './layout.module.css';
import Navigation from '../Navigation/Navigation';
// import Toolbar from '../Navigation/Toolbar/Toolbar'
// import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux';

const layout = (props) => {


        return(
            <Aux>
                {/* <Toolbar clicked={this.sideDrawerOpenHandler}
                         isAuth ={this.props.isAuth}/>
                <SideDrawer open={this.state.showSideDrawer} 
                            isAuth ={this.props.isAuth}
                            closed={this.sideDrawerClosedHandler}/> */}
                <Navigation isAuth={props.isAuth} />
                    
                <main>
                    {props.children}
                </main>
             </Aux>
        )
    }
 

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps,null)(layout);