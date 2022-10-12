import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { constructorIngredientsReducer } from './burger-constructor';
import { orderReducer } from './order-details';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    order: orderReducer,
  });
