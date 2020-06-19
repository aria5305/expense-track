import React, { Component } from 'react';
import Hero from './Components/hero/hero';

import {Route,Switch,Redirect} from 'react-router-dom';
import Layout from './Components/layout/layout';
import Logout from './Containers/Auth/logout/logout';

import MyApp from './Containers/myApp/myApp';

import {connect} from 'react-redux';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'

import {faSignOutAlt, faIdCardAlt,faMoneyCheckAlt, faTrash,faWallet,faUserPlus, 
  faPlaneDeparture,faFrog,faCogs,faList ,faMoneyBillAlt,faPiggyBank,faTags,faIgloo,
faEnvelopeSquare,faBox,faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import MyAccount from './Containers/myAccount/myAccount';

const asyncAbout = asyncComponent(()=> {
  return import ('./Components/about/about');
})

const asyncLogin = asyncComponent(()=> {
  return import('./Containers/Auth/Login/Login');
})

const asyncSignUp = asyncComponent(()=> {
  return import('./Containers/Auth/signUp/signUp');
})

const asyncMyAccount =  asyncComponent(()=> {
  return import('./Containers/myAccount/myAccount');
})


// import {connect} from 'react-redux';

library.add(faSignOutAlt,faIdCardAlt,faMoneyCheckAlt,faBox,faSignInAlt,faIgloo,faEnvelopeSquare,faMoneyBillAlt,faPiggyBank,faTags,faList,faWallet,faUserPlus,faPlaneDeparture,faFrog,faGoogle,faCogs,faTrash) 



class App extends Component  {

  render(){
    let routes = (
      <Switch>
        <Route path='/login' component={asyncLogin}/>
        <Route path='/signup'  component={asyncSignUp}/>
        <Route path='/about'  component={asyncAbout}/>
        <Route path="/" exact component={Hero}/>
        <Redirect to= '/' />
      </Switch>
    )

      if(this.props.isAuth){
        routes = (
          <Switch>
             <Route path='/logout' component={Logout}/>
             <Route path='/myaccount' component={asyncMyAccount}/>
             <Route path='/myApp' component={MyApp} />
             <Route path='/' exact component={MyApp}/>
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
