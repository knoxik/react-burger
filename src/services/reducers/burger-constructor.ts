import { TIngredient } from "../types/data";
import { UPDATE_BUN, ADD_BUN, ADD_INGREDIENT, INCREMENT_PRICE, DECREMENT_PRICE, MOVE_INGREDIENT, DELETE_INGREDIENT, TBurgerConstructorActions } from "../actions/burger-constructor"
import update from 'immutability-helper'

type TState = {
    constructorIngredients: Array<TIngredient>;
};

const initialState: TState = {
    constructorIngredients: []
}

export const constructorIngredientsReducer = (state = initialState, action: TBurgerConstructorActions): TState => {
    switch (action.type) {
        case UPDATE_BUN: {
            const newArr = [...state.constructorIngredients]
            newArr[0] = action.bun
            return {
                ...state,
                constructorIngredients: newArr
            };
        }
        case ADD_BUN: {
            return {
                ...state,
                constructorIngredients: [action.bun]
            };
        }
        case ADD_INGREDIENT: {
            const newArr = [...state.constructorIngredients]
            const newIngredient = {...action.ingredient}
            newIngredient.uniq_id = action.uniq_id
            newArr.push(newIngredient)
            return {
                ...state,
                constructorIngredients: newArr
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
            return {
                ...state,
                constructorIngredients: state.constructorIngredients.filter((ingredient) => ingredient.uniq_id !== action.uniq_id)
            }
        }
        default: {
            return state
        }
    }
} 


type TPriceState = {
    price: number;
}

export const initialPrice: TPriceState = { price: 0 };

export const ingredientsPriceReducer = (state = initialPrice, action: TBurgerConstructorActions): TPriceState => {
    switch (action.type) {
      case INCREMENT_PRICE:
        return { price: state.price + action.price };
      case DECREMENT_PRICE:
        return { price: state.price - action.price };
      default:
        return state
    }
  }