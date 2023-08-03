import { 
    USER_REGISTER_FORM_SET_VALUE, 
    USER_REGISTER_FORM_SUBMIT, 
    USER_REGISTER_FORM_SUBMIT_FAILED, 
    USER_REGISTER_FORM_SUBMIT_SUCCESS,
    TRegisterActions
} from "../actions/register";

type TState = {
    form: {
        name: string;
        email: string;
        password: string;
    };
    registrationRequest: boolean;
    registrationFailed: boolean;
}

const initialState: TState = {
    form: {
        name: '',
        email: '',
        password: '',
    },
    registrationRequest: false,
    registrationFailed: false,
}

export const userRegistrationFormReducer = (state = initialState, action: TRegisterActions): TState => {
    switch(action.type) {
        case USER_REGISTER_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case USER_REGISTER_FORM_SUBMIT: {
            return {
                ...state,
                registrationRequest: true,
                registrationFailed: false
            }
        }
        case USER_REGISTER_FORM_SUBMIT_SUCCESS: {
            if (action.data.success) {
                return {
                    ...state,
                    form: {
                        ...initialState.form
                    },
                    registrationRequest: false
                }
            } else {
                return {
                    ...state,
                    registrationRequest: false,
                    registrationFailed: true
                }
            }
            
        }
        case USER_REGISTER_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                registrationRequest: false,
                registrationFailed: true
            }
        }
        default: {
            return state;
        }
    }
} 

