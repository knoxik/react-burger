import { TOrder } from "../types/data";

export const CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST' = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS' = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR: 'CREATE_ORDER_ERROR' = 'CREATE_ORDER_ERROR';
export const RESET_ORDER_STATUS: 'RESET_ORDER_STATUS' = 'RESET_ORDER_STATUS'

type TData = {
    success: boolean;
    name: string;
    order: TOrder;
  }

export interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
    readonly data: TData;
}

export interface ICreateOrderErrorAction {
    readonly type: typeof CREATE_ORDER_ERROR;
}

export interface IResetOrderStatusAction {
    readonly type: typeof RESET_ORDER_STATUS;
}

export type TOrderDetailsActions = 
    | ICreateOrderRequestAction
    | ICreateOrderSuccessAction
    | ICreateOrderErrorAction
    | IResetOrderStatusAction
