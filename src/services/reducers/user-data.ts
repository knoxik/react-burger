import { SET_USER_DATA, GET_USER_REQUEST, GET_USER_ERROR, GET_USER_SUCCESS, DELETE_USER_DATA, TUserDataActions } from "../actions/user-data";

type TState = {
    isAuth: boolean;
    userRequest: boolean;
    userFailed: boolean;
    user: {
        name: string;
        email: string;
    } | null;
};

const initialState: TState = {
    user: null,
    isAuth: false,
    userRequest: true,
    userFailed: false,
}

export const userDetaReducer = (state = initialState, action: TUserDataActions): TState => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                user: action.data.user,
                isAuth: true
            };
        }
        case DELETE_USER_DATA: {
            return initialState;
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                userRequest: true,
                userFailed: false,
            };
          }
        case GET_USER_SUCCESS: {
            if (action.data.success) {
                return {
                    ...state,
                    user: action.data.user,
                    isAuth: true,
                    userRequest: false,
                    userFailed: false,
                };
            } else {
                return { 
                    ...state, 
                    userFailed: true, 
                    userRequest: false 
                };
            }
            
        }
        case GET_USER_ERROR: {
            return { 
                ...state, 
                userFailed: true, 
                userRequest: false 
            };
        }
        default: {
            return state;
        }
    }
};

