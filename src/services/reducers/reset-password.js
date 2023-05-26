import { 
    RESET_PASSWORD_FORM_SET_VALUE, 
    RESET_PASSWORD_FORM_SUBMIT, 
    RESET_PASSWORD_FORM_SUBMIT_FAILED, 
    RESET_PASSWORD_FORM_SUBMIT_SUCCESS 
} from "../actions/reset-password";

const initialState = {
    form: {
        password: '',
        code: ''
    },
    resetPasswordRequest: false,
    resetPasswordFailed: false,
}

export const resetPasswordFormReducer = (state = initialState, action) => {
    switch(action.type) {
        case RESET_PASSWORD_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case RESET_PASSWORD_FORM_SUBMIT: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordFailed: false
            }
        }
        case RESET_PASSWORD_FORM_SUBMIT_SUCCESS: {
            if (action.data.success) {
                return {
                    ...state,
                    form: {
                        ...initialState.form
                    },
                    resetPasswordRequest: false
                }
            } else {
                return {
                    ...state,
                    resetPasswordRequest: false,
                    resetPasswordFailed: true
                }
            }         
        }
        case RESET_PASSWORD_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true
            }
        }
        default: {
            return state;
        }
    }
} 

