import * as actionType from '../action/actionType'

const initialState= {
    ingrediant: null,
    totalPrice : 4,
    error: false,
    burgerBuilder: false
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
                totalPrice: state.totalPrice + INGREDIANT_PRICE[action.ingrediantName],
                burgerBuilder: true
            }
        case actionType.REMOVE_INGREDIANT:
            return{
                ...state,
                ingrediant:{
                    ...state.ingrediant,
                    [action.ingrediantName]: state.ingrediant[action.ingrediantName] - 1
                },
                totalPrice: state.totalPrice - INGREDIANT_PRICE[action.ingrediantName],
                burgerBuilder: true
            }
        case actionType.FETCH_INGREDIANT_FAILED:
            return{
                ...state,
                error:true
            }
        case actionType.SET_INGREDIANTS:
            return {
                ...state,
                //ingrediant: action.ingrediants,
                //for ordering
                ingrediant: {
                    Salad : action.ingrediants.Salad,
                    Bacon : action.ingrediants.Bacon,
                    Cheese : action.ingrediants.Cheese,
                    Meat : action.ingrediants.Meat
                },
                error: false,
                totalPrice: 4,
                burgerBuilder: false
            }
        default:
            return state
    }
    
}
export default reducer