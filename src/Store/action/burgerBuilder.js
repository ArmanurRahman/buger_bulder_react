import * as actionsType from './actionType'
import axiosInstance from '../../axios-order';

export const addIngrediant = (name) => {
    return {
        type: actionsType.ADD_INGREDIANT,
        ingrediantName: name
    }
}

export const removeIngrediant = (name) => {
    return {
        type: actionsType.REMOVE_INGREDIANT,
        ingrediantName: name
    }
}

export const setIngridiant = (ingrediant) => {
    return {
        type: actionsType.SET_INGREDIANTS,
        ingrediants: ingrediant
    }
}

export const fetchIngredientFail = () => {
    return {
        type: actionsType.FETCH_INGREDIANT_FAILED
    }
}

export const initIngridaints = () => {
    return dispatch => {
        
        axiosInstance.get('https://my-burger-react-b4859.firebaseio.com/ingrediants.json')
        .then(response =>{
            dispatch(setIngridiant(response.data))
        }).catch(error => {
            
        })
            
    }
}  