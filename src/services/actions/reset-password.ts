import { TForgotPasswordData } from "../types/data";

export const RESET_PASSWORD_FORM_SET_VALUE: 'RESET_PASSWORD_FORM_SET_VALUE' = 'RESET_PASSWORD_FORM_SET_VALUE';
export const RESET_PASSWORD_FORM_SUBMIT: 'RESET_PASSWORD_FORM_SUBMIT' = 'RESET_PASSWORD_FORM_SUBMIT';
export const RESET_PASSWORD_FORM_SUBMIT_SUCCESS: 'RESET_PASSWORD_FORM_SUBMIT_SUCCESS' = 'RESET_PASSWORD_FORM_SUBMIT_SUCCESS';
export const RESET_PASSWORD_FORM_SUBMIT_FAILED: 'RESET_PASSWORD_FORM_SUBMIT_FAILED' = 'RESET_PASSWORD_FORM_SUBMIT_FAILED';

export interface IResetPasswordFormSetValueAction {
    readonly type: typeof RESET_PASSWORD_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IResetPasswordFormSubmitAction {
    readonly type: typeof RESET_PASSWORD_FORM_SUBMIT;
}

export interface IResetPasswordFormSubmitSuccessAction {
    readonly type: typeof RESET_PASSWORD_FORM_SUBMIT_SUCCESS;
    readonly data: TForgotPasswordData;
}

export interface IResetPasswordFormSubmitFailedAction {
    readonly type: typeof RESET_PASSWORD_FORM_SUBMIT_FAILED;
}

export type TResetPasswordActions = 
    | IResetPasswordFormSetValueAction
    | IResetPasswordFormSubmitAction
    | IResetPasswordFormSubmitSuccessAction
    | IResetPasswordFormSubmitFailedAction

export const setFormValue = (field: string, value: string): IResetPasswordFormSetValueAction => ({
    type: RESET_PASSWORD_FORM_SET_VALUE,
    field,
    value
});