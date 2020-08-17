import React, {Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionType from '../../../Store/action/index'

class Logout extends Component{

    componentDidMount(){
        this.props.onLogout();
    }

    render(){
        return (
            <Redirect to='/'/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(actionType.logout())
    }
}
export default connect(null, mapDispatchToProps) (Logout)