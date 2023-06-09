export const SET_USER_DATA: 'SET_USER_DATA' = 'SET_USER_DATA';
export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_ERROR: 'GET_USER_ERROR' = 'GET_USER_ERROR';
export const DELETE_USER_DATA: 'DELETE_USER_DATA' = 'DELETE_USER_DATA';

type TData = {
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
    user: {
        email: string;
        name: string;
    };
};

export interface ISetUserDataAction {
    readonly type: typeof SET_USER_DATA;
    readonly data: TData;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly data: TData;
}

export interface IGetUserErrorAction {
    readonly type: typeof GET_USER_ERROR;
}

export interface IDeleteUserDataAction {
    readonly type: typeof DELETE_USER_DATA;
}

export type TUserDataActions = 
    | IDeleteUserDataAction
    | IGetUserErrorAction
    | IGetUserSuccessAction
    | IGetUserRequestAction
    | ISetUserDataAction