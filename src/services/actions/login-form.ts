import { TUserLogin } from "../types/data";

export const USER_LOGIN_FORM_SET_VALUE: 'USER_LOGIN_FORM_SET_VALUE' = 'USER_LOGIN_FORM_SET_VALUE';
export const USER_LOGIN_FORM_SUBMIT: 'USER_LOGIN_FORM_SUBMIT' = 'USER_LOGIN_FORM_SUBMIT';
export const USER_LOGIN_FORM_SUBMIT_SUCCESS: 'USER_LOGIN_FORM_SUBMIT_SUCCESS' = 'USER_LOGIN_FORM_SUBMIT_SUCCESS';
export const USER_LOGIN_FORM_SUBMIT_FAILED: 'USER_LOGIN_FORM_SUBMIT_FAILED' = 'USER_LOGIN_FORM_SUBMIT_FAILED';

type TData = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: TUserLogin
}

export interface IUserLoginFormSetValueAction {
    readonly type: typeof USER_LOGIN_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IUserLoginFormSubmitAction {
    readonly type: typeof USER_LOGIN_FORM_SUBMIT;
}

export interface IUserLoginFormSubmitSucessAction {
    readonly type: typeof USER_LOGIN_FORM_SUBMIT_SUCCESS;
    readonly data: TData
}

export interface IUserLoginFormSubmitFailedAction {
    readonly type: typeof USER_LOGIN_FORM_SUBMIT_FAILED;
}

export type TLoginFormActions = 
    | IUserLoginFormSetValueAction
    | IUserLoginFormSubmitAction
    | IUserLoginFormSubmitSucessAction
    | IUserLoginFormSubmitFailedAction

export const setUserFormValue = (field: string, value: string): IUserLoginFormSetValueAction => ({
    type: USER_LOGIN_FORM_SET_VALUE,
    field,
    value
});