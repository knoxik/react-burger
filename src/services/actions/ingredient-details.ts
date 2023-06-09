import { TIngredient } from "../types/data";

export const ADD_INGREDIENT_DETAILS: 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS: 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';

export interface IAddIngredientDetailsAction {
    readonly type: typeof ADD_INGREDIENT_DETAILS;
    readonly payload: TIngredient;
}

export interface IDeleteIngredientDetailsAction {
    readonly type: typeof DELETE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = 
    | IDeleteIngredientDetailsAction
    | IAddIngredientDetailsAction