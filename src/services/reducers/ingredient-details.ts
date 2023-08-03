import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS, TIngredientDetailsActions } from "../actions/ingredient-details";
import { TIngredient } from "../types/data";

type TState = {
    ingredient: TIngredient | null;
}

const initialDetails: TState = {
    ingredient: null
}

export const ingredientDetalisReducer = (state = initialDetails, action: TIngredientDetailsActions): TState => {
    switch (action.type) {
        case ADD_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredient: action.payload
            };
        }
        case DELETE_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredient: null
            };
        }
        default: {
            return state;
        }
    }
};