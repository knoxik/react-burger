import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { constructorIngredientsReducer, ingredientsPriceReducer } from './burger-constructor';
import { orderReducer } from './order-details';
import { ingredientDetalisReducer } from './ingredient-details';
import { userRegistrationFormReducer } from './register';
import { userDetaReducer } from './user-data';
import { userLoginFormReducer } from './login-form';
import { forgotPasswordFormReducer } from './forgot-password';
import { resetPasswordFormReducer } from './reset-password';
import { updateUserFormReducer } from './profile-info';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    ingredientsPrice: ingredientsPriceReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetalisReducer,
    registrationForm: userRegistrationFormReducer,
    loginForm: userLoginFormReducer,
    forgotPasswordForm: forgotPasswordFormReducer,
    resetPasswordForm: resetPasswordFormReducer,
    updateUserForm: updateUserFormReducer,
    user: userDetaReducer,
    ws: wsReducer,
});
