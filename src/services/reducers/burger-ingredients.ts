import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR, TBurgerIngredientsActions } from "../actions/burger-ingredients";
import { TIngredient, TIngredientsById } from "../types/data";

type TState = {
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    ingredients: ReadonlyArray<TIngredient>;
    ingredientsById: TIngredientsById;
    bunList: Array<TIngredient>;
    sauceList: Array<TIngredient>;
    mainList: Array<TIngredient>;
}

const initialState: TState = {
    ingredientsRequest: true,
    ingredientsFailed: false,
    ingredients: [],
    ingredientsById: {},
    bunList: [],
    sauceList: [],
    mainList: []
}

export const ingredientsReducer = (state = initialState, action: TBurgerIngredientsActions): TState => {
    switch (action.type) {
      case GET_INGREDIENTS_REQUEST: {
        return {
            ...state,
            ingredientsRequest: true,
            ingredientsFailed: false,
        };
      }
      case GET_INGREDIENTS_SUCCESS: {
        const bunList: Array<TIngredient> = [];
        const sauceList: Array<TIngredient> = [];
        const mainList: Array<TIngredient> = [];
        const ingredientsById: TIngredientsById = {};
        action.ingredients.forEach((ingredient) => {
          ingredientsById[ingredient._id] = ingredient;
          switch(ingredient.type) {
              case 'bun':
                  bunList.push(ingredient)
                  break;
              case 'sauce':
                  sauceList.push(ingredient)
                  break;
              case 'main':
                  mainList.push(ingredient)
                  break;
          }
        })
        
        return { 
            ...state, 
            ingredients: action.ingredients, 
            bunList: bunList,
            sauceList: sauceList,
            mainList: mainList,
            ingredientsById: ingredientsById,
            ingredientsRequest: false 
        };
      }
      case GET_INGREDIENTS_ERROR: {
        return { 
            ...state, 
            ingredientsFailed: true, 
            ingredientsRequest: false 
        };
      }
          default: {
              return state
          }
      }
} 


