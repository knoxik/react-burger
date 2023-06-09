export const PROFILE_INFO_FORM_SET_VALUE: 'PROFILE_INFO_FORM_SET_VALUE' = 'PROFILE_INFO_FORM_SET_VALUE';
export const PROFILE_INFO_FORM_SUBMIT: 'PROFILE_INFO_FORM_SUBMIT' = 'PROFILE_INFO_FORM_SUBMIT';
export const PROFILE_INFO_FORM_SUBMIT_SUCCESS: 'PROFILE_INFO_FORM_SUBMIT_SUCCESS' = 'PROFILE_INFO_FORM_SUBMIT_SUCCESS';
export const PROFILE_INFO_FORM_SUBMIT_FAILED: 'PROFILE_INFO_FORM_SUBMIT_FAILED' = 'PROFILE_INFO_FORM_SUBMIT_FAILED';

type TData = {
    success: boolean;
    user: {
        email: string;
        name: string;
    }
}

export interface IProfileInfoFormSetValueAction {
    readonly type: typeof PROFILE_INFO_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string | null;
}

export interface IProfileInfoFormSubmitAction {
    readonly type: typeof PROFILE_INFO_FORM_SUBMIT;
}

export interface IProfileInfoFormSubmitSuccessAction {
    readonly type: typeof PROFILE_INFO_FORM_SUBMIT_SUCCESS;
    readonly data: TData;
}

export interface IProfileInfoFormSubmitFailedAction {
    readonly type: typeof PROFILE_INFO_FORM_SUBMIT_FAILED;
}

export type TProfileInfoActions = 
    | IProfileInfoFormSetValueAction
    | IProfileInfoFormSubmitAction
    | IProfileInfoFormSubmitSuccessAction
    | IProfileInfoFormSubmitFailedAction

export const setFormValue = (field: string, value: string | null): IProfileInfoFormSetValueAction => ({
    type: PROFILE_INFO_FORM_SET_VALUE,
    field,
    value
});