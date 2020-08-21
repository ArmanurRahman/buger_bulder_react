import React, {useEffect, Suspense} from 'react';
import Layout from './components/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from  'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import * as actionType from './Store/action/index'
import { connect } from 'react-redux'


const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const Order = React.lazy(() => {
  return import('./containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const App = (props) => {

  useEffect(() => {
    props.onTryAutoSignUp()
  }, [])

 

    let route = (
      <Switch>
        <Route path='/auth' render={() => <Auth/>}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )
    if(props.isAuthinticated){
      route = (
        <Switch>
        <Route path='/checkout' render={(props) => <Checkout {...props}/>}/>
        <Route path='/orders' render={(props) => <Order {...props}/>}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/auth' render={() => <Auth/>}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>
      )
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading..</p>} >{route}</Suspense>
          
        </Layout>
      </div>
    );      
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
