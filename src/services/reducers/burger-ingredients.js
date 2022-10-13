import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR } from "../actions/burger-ingredients";

const initialState = {
    ingredientsRequest: true,
    ingredientsFailed: false,
    ingredients: [],
    bunList: [],
    sauceList: [],
    mainList: []
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENTS_REQUEST: {
        return {
            ...state,
            ingredientsRequest: true,
            ingredientsFailed: false,
        };
      }
      case GET_INGREDIENTS_SUCCESS: {
        const bunList = [];
        const sauceList = [];
        const mainList = [];
        action.ingredients.forEach((ingredient) => {
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


