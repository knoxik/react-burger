import { 
    PROFILE_INFO_FORM_SET_VALUE, 
    PROFILE_INFO_FORM_SUBMIT, 
    PROFILE_INFO_FORM_SUBMIT_FAILED, 
    PROFILE_INFO_FORM_SUBMIT_SUCCESS,
    TProfileInfoActions
} from "../actions/profile-info";

type TState = {
    form: {
        email: string;
        name: string;
        password: string | null;
    };
    updateUserRequest: boolean;
    updateUserFailed: boolean;
};

const initialState: TState = {
    form: {
        email: '',
        name: '',
        password: null
    },
    updateUserRequest: false,
    updateUserFailed: false,
}

export const updateUserFormReducer = (state = initialState, action: TProfileInfoActions): TState => {
    switch(action.type) {
        case PROFILE_INFO_FORM_SET_VALUE: {
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        }
        case PROFILE_INFO_FORM_SUBMIT: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false
            }
        }
        case PROFILE_INFO_FORM_SUBMIT_SUCCESS: {
            if (action.data.success) {
                return {
                    ...state,
                    form: {
                        ...initialState.form
                    },
                    updateUserRequest: false
                }
            } else {
                return {
                    ...state,
                    updateUserRequest: false,
                    updateUserFailed: true
                }
            }         
        }
        case PROFILE_INFO_FORM_SUBMIT_FAILED: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true
            }
        }
        default: {
            return state;
        }
    }
} 

