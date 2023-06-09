import { TIngredient } from "../types/data";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENS_REQUEST' = 'GET_INGREDIENS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENS_SUCCESS' = 'GET_INGREDIENS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENS_ERROR' = 'GET_INGREDIENS_ERROR';

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsErrorAction {
    readonly type: typeof GET_INGREDIENTS_ERROR;
}

export type TBurgerIngredientsActions = 
    | IGetIngredientsErrorAction
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction