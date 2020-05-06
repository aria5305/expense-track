import React, { Component } from 'react';
// import logo from './logo.svg';
import Hero from './Components/hero/hero';
import About from './Components/about/about'
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Layout from './Components/layout/layout';
import SignUp from './Containers/Auth/signUp/signUp'; 
import Logout from './Containers/Auth/logout/logout';
import MyAccount from './Containers/myAccount/myAccount';
import MyApp from './Containers/myApp/myApp';
import Login from './Containers/Auth/Login/Login'

import Auth from './Containers/Auth/Auth';
import {connect} from 'react-redux';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'

import { faTrash,faWallet,faUserPlus, 
  faPlaneDeparture,faFrog,faCogs,
faEnvelopeSquare} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


// import {connect} from 'react-redux';

library.add(faEnvelopeSquare,faWallet,faUserPlus,faPlaneDeparture,faFrog,faGoogle,faCogs,faTrash) 



class App extends Component  {

  render(){
    let routes = (
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/signup'  component={SignUp}/>
        <Route path='/about'  component={About}/>
        <Route path="/" exact component={MyAccount}/>
      </Switch>
    )

      if(this.props.isAuth){
        routes = (
          <Switch>
             <Route path='/logout' component={Logout}/>
             <Route path='/myaccount' component={MyAccount}/>
             <Route path='/myApp' component={MyApp} />
             <Route path='/' exact component={Hero}/>
             <Redirect to= '/' />
          </Switch>
        )
      }
    
  return (
   
    <Layout>
      {routes}
    </Layout>
  );
  }
}


const mapStateToProps = state => {
  return {
      isAuth:state.auth.isAuth,
  
  }

}
// const mapDispatchToProps = dispatch => {
//   // return {
//   //     onAuth: (email,password) => dispatch(actions.auth(email,password)),
//   //     onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
//   }
// }

export default connect(mapStateToProps,null)(App); 
