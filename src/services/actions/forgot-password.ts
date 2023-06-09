import { TForgotPasswordData } from "../types/data";

export const FORGOT_PASSWORD_FORM_SET_VALUE: 'FORGOT_PASSWORD_FORM_SET_VALUE' = 'FORGOT_PASSWORD_FORM_SET_VALUE';
export const FORGOT_PASSWORD_FORM_SUBMIT: 'FORGOT_PASSWORD_FORM_SUBMIT' = 'FORGOT_PASSWORD_FORM_SUBMIT';
export const FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS: 'FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS' = 'FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS';
export const FORGOT_PASSWORD_FORM_SUBMIT_FAILED: 'FORGOT_PASSWORD_FORM_SUBMIT_FAILED' = 'FORGOT_PASSWORD_FORM_SUBMIT_FAILED';

export interface IForgotPasswordFormSetValueAction {
    readonly type: typeof FORGOT_PASSWORD_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IForgotPasswordFormSubmitAction {
    readonly type: typeof FORGOT_PASSWORD_FORM_SUBMIT;
}

export interface IForgotPasswordFormSubmitSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS;
    readonly data: TForgotPasswordData;
}

export interface IForgotPasswordFormSubmitFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FORM_SUBMIT_FAILED;
}

export type TForgotPasswordActions = 
    | IForgotPasswordFormSetValueAction
    | IForgotPasswordFormSubmitAction
    | IForgotPasswordFormSubmitSuccessAction
    | IForgotPasswordFormSubmitFailedAction

export const setFormValue = (field: string, value: string): IForgotPasswordFormSetValueAction => ({
    type: FORGOT_PASSWORD_FORM_SET_VALUE,
    field,
    value
});