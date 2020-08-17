import * as actionType from '../action/actionType'

const initilize = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    authRedirectPath: '/'
}

const reducer = (state = initilize, action) => {
    switch(action.type){
        case actionType.AUTH_START:
            return{
                ...state,
                loading: true,
                error: null
            }
        case actionType.AUTH_SUCCESS:
            return{
                ...state,
                token: action.token,
                userId: action.userId,
                loading: false,
                error: null
            }
        case actionType.AUTH_FAIL:
            return{
                ...state,
                error:action.error,
                loading: false
            }
        case actionType.AUTH_LOGOUT:
            return{
                ...state,
                token: null,
                userId: null
            }
        case actionType.SET_AUTH_REDIRECT_PATH: 
            return{
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state
    }
}

export default reducer