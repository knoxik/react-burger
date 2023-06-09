import { TIngredient } from "../types/data";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const UPDATE_BUN: 'UPDATE_BUN' = 'UPDATE_BUN';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const INCREMENT_PRICE: 'INCREMENT_PRICE' = 'INCREMENT_PRICE';
export const DECREMENT_PRICE: 'DECREMENT_PRICE' = 'DECREMENT_PRICE';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly ingredient: TIngredient;
    readonly uniq_id: string;
}

export interface IUpdateBunAction {
    readonly type: typeof UPDATE_BUN;
    readonly bun: TIngredient;
}

export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
    readonly bun: TIngredient;
}

export interface IIncrementPriceAction {
    readonly type: typeof INCREMENT_PRICE;
    readonly price: number;
}

export interface IDecrementPriceAction {
    readonly type: typeof DECREMENT_PRICE;
    readonly price: number;
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly uniq_id: string;
}

export type TBurgerConstructorActions = 
    | IAddIngredientAction
    | IUpdateBunAction
    | IAddBunAction
    | IIncrementPriceAction
    | IDecrementPriceAction
    | IMoveIngredientAction
    | IDeleteIngredientAction