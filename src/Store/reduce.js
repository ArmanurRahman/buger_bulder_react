import * as actionType from './action'

const initialState= {
    ingrediant: {
        Bacon: 0,
        Cheese: 0,
        Meat: 0,
        Salad: 0
    },
    totalPrice : 4,
}
const INGREDIANT_PRICE = {
    'Meat' : 0.5,
    'Cheese' : 0.4,
    'Salad': 1.3,
    'Bacon': 0.7    
}


const reducer = (state = initialState, action) => {
    
    switch(action.type){
        case actionType.ADD_INGREDIANT:
            
            return{
                ...state,
                ingrediant:{
                    ...state.ingrediant,
                    [action.ingrediantName]: state.ingrediant[action.ingrediantName] + 1
                },
                totalPrice: state.totalPrice + INGREDIANT_PRICE[action.ingrediantName]
            }
        case actionType.REMOVE_INGREDIANT:
            return{
                ...state,
                ingrediant:{
                    ...state.ingrediant,
                    [action.ingrediantName]: state.ingrediant[action.ingrediantName] - 1
                },
                totalPrice: state.totalPrice - INGREDIANT_PRICE[action.ingrediantName]
            }
        default:
            return state
    }
    
}
export default reducer