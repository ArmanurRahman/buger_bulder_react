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
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
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
            const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000)
            console.log(response.data)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('userId', response.data.localId)
            localStorage.setItem('expirationDate', expirationDate)
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date())/ 1000))
            }
        }
    }
}