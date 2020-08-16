import * as actionType from './actionType'
import axios from 'axios'

export const authStart = () => {
    return{
        type: actionType.AUTH_START 
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return{
        type: actionType.AUTH_FAIL,
        error: error,
        
    }
}

export const logout = () => {
    return{
        type: actionType.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        },expireTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch =>{
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS8owsbMkdpeaW9OVPPdej-34uxHpsyn4'
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDS8owsbMkdpeaW9OVPPdej-34uxHpsyn4'
        }
        dispatch(authStart())
        axios.post(url, authData)
        .then( response=>{
            console.log(response.data)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }
            
        )
        .catch( error=> {
            console.log(error.response.data.error)
            dispatch(authFail(error.response.data.error))
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return{
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}