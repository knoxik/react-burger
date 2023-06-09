import { TUserLogin } from "../types/data";

export const USER_REGISTER_FORM_SET_VALUE: 'USER_REGISTER_FORM_SET_VALUE' = 'USER_REGISTER_FORM_SET_VALUE';
export const USER_REGISTER_FORM_SUBMIT: 'USER_REGISTER_FORM_SUBMIT' = 'USER_REGISTER_FORM_SUBMIT';
export const USER_REGISTER_FORM_SUBMIT_SUCCESS: 'USER_REGISTER_FORM_SUBMIT_SUCCESS' = 'USER_REGISTER_FORM_SUBMIT_SUCCESS';
export const USER_REGISTER_FORM_SUBMIT_FAILED: 'USER_REGISTER_FORM_SUBMIT_FAILED' = 'USER_REGISTER_FORM_SUBMIT_FAILED';

type TData = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: TUserLogin;
}

export interface IUserRegisterFormSetValueAction {
    readonly type: typeof USER_REGISTER_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IUserRegisterFormSubmitAction {
    readonly type: typeof USER_REGISTER_FORM_SUBMIT;
}

export interface IUserRegisterFormSubmitSuccessAction {
    readonly type: typeof USER_REGISTER_FORM_SUBMIT_SUCCESS;
    readonly data: TData;
}

export interface IUserRegisterFormSubmitFailedAction {
    readonly type: typeof USER_REGISTER_FORM_SUBMIT_FAILED;
}

export type TRegisterActions = 
    | IUserRegisterFormSetValueAction
    | IUserRegisterFormSubmitAction
    | IUserRegisterFormSubmitSuccessAction
    | IUserRegisterFormSubmitFailedAction

export const setUserFormValue = (field: string, value: string): IUserRegisterFormSetValueAction => ({
    type: USER_REGISTER_FORM_SET_VALUE,
    field,
    value
});