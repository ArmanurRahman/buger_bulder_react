import React, {Component} from 'react';
import Layout from './components/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch, withRouter, Redirect } from  'react-router-dom'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actionType from './Store/action/index'
import { connect } from 'react-redux'

class App extends Component{

  componentDidMount(){
    this.props.onTryAutoSignUp()
  }
  render(){

    let route = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )
    if(this.props.isAuthinticated){
      route = (
        <Switch>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );    
  }

}

const mapStateToProps = state => {
  return {
    isAuthinticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(actionType.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps) (App)) ;
