import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionType from '../../../Store/action/index'

const Logout = props =>{

    useEffect(() => {
        props.onLogout();
    })
    
    return (
        <Redirect to='/'/>
    )
    
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(actionType.logout())
    }
}
export default connect(null, mapDispatchToProps) (Logout)