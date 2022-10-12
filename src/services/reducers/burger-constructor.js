import { UPDATE_BUN, ADD_BUN, ADD_INGREDIENT, INCREMENT_PRICE, DECREMENT_PRICE, MOVE_INGREDIENT, DELETE_INGREDIENT } from "../actions/burger-constructor"
import update from 'immutability-helper'

const initialState = {
    constructorIngredients: []
}

export const constructorIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BUN: {
            state.constructorIngredients[0] = action.bun
            return {
                ...state,
                constructorIngredients: state.constructorIngredients
            };
        }
        case ADD_BUN: {
            return {
                ...state,
                constructorIngredients: [action.bun]
            };
        }
        case ADD_INGREDIENT: {
            state.constructorIngredients.push(action.ingredient)
            return {
                ...state,
                constructorIngredients: state.constructorIngredients
            };
        }
        case MOVE_INGREDIENT : {
            return {
                ...state,
                constructorIngredients: update(state.constructorIngredients, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, state.constructorIngredients[action.dragIndex]],
                    ],
                })
                    
                
            }
        }
        case DELETE_INGREDIENT: {
            state.constructorIngredients.splice(action.index, 1)
            return {
                ...state,
                constructorIngredients: state.constructorIngredients
            }
        }
        default: {
            return state
        }
    }
} 


export const initialPrice = { price: 0 };

export const ingredientsPriceReducer = (state = initialPrice, action) => {
    switch (action.type) {
      case INCREMENT_PRICE:
        return { price: state.price + action.price };
      case DECREMENT_PRICE:
        return { price: state.price - action.price };
      default:
        return state
    }
  }