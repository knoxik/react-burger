import { store } from '../store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TForgotPasswordActions } from '../actions/forgot-password';
import { TIngredientDetailsActions } from '../actions/ingredient-details';
import { TLoginFormActions } from '../actions/login-form';
import { TOrderDetailsActions } from '../actions/order-details';
import { TProfileInfoActions } from '../actions/profile-info';
import { TRegisterActions } from '../actions/register';
import { TResetPasswordActions } from '../actions/reset-password';
import { TUserDataActions } from '../actions/user-data';
import { TWsActions } from '../actions/wsActionTypes';

export type RootState = ReturnType<typeof store.getState>; 

type TApplicationActions = 
    | TBurgerConstructorActions
    | TBurgerIngredientsActions
    | TForgotPasswordActions
    | TIngredientDetailsActions
    | TLoginFormActions
    | TOrderDetailsActions
    | TProfileInfoActions
    | TRegisterActions
    | TResetPasswordActions
    | TUserDataActions
    | TWsActions;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;