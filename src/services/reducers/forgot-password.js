import { 
    FORGOT_PASSWORD_FORM_SET_VALUE, 
    FORGOT_PASSWORD_FORM_SUBMIT, 
    FORGOT_PASSWORD_FORM_SUBMIT_FAILED, 
    FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS 
} from "../actions/forgot-password";

const initialState = {
    form: {
        email: '',
    },
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
}

export const forgotPasswordFormReducer = (state = initialState, action) => {
    switch(action.type) {
        case FORGOT_PASSWORD_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case FORGOT_PASSWORD_FORM_SUBMIT: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false
            }
        }
        case FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS: {
            if (action.data.success) {
                return {
                    ...state,
                    form: {
                        ...initialState.form
                    },
                    forgotPasswordRequest: false
                }
            } else {
                return {
                    ...state,
                    forgotPasswordRequest: false,
                    forgotPasswordFailed: true
                }
            }         
        }
        case FORGOT_PASSWORD_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true
            }
        }
        default: {
            return state;
        }
    }
} 

