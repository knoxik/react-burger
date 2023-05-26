import { 
    USER_LOGIN_FORM_SET_VALUE, 
    USER_LOGIN_FORM_SUBMIT, 
    USER_LOGIN_FORM_SUBMIT_FAILED, 
    USER_LOGIN_FORM_SUBMIT_SUCCESS 
} from "../actions/login-form";

const initialState = {
    form: {
        email: '',
        password: '',
    },
    loginRequest: false,
    loginFailed: false,
}

export const userLoginFormReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGIN_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case USER_LOGIN_FORM_SUBMIT: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false
            }
        }
        case USER_LOGIN_FORM_SUBMIT_SUCCESS: {
            if (action.data.success) {
                return {
                    ...state,
                    form: {
                        ...initialState.form
                    },
                    loginRequest: false
                }
            } else {
                return {
                    ...state,
                    loginRequest: false,
                    loginFailed: true
                }
            }         
        }
        case USER_LOGIN_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            }
        }
        default: {
            return state;
        }
    }
} 

