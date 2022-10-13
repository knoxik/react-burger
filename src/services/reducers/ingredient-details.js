import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from "../actions/ingredient-details";

const initialDetails = {
    ingredient: null
}

export const ingredientDetalisReducer = (state = initialDetails, action) => {
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