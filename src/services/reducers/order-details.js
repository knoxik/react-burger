import { CREATE_ORDER, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED } from "../actions/order-details";

const initialState = {
    orderRequest: true,
    orderFailed: false,
    data: {}
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER: {
        return {
            ...state,
            orderRequest: true,
            orderFailed: false,
        };
      }
      case CREATE_ORDER_SUCCESS: {        
        return { 
            ...state, 
            data: action.data, 
            orderRequest: false,
        };
      }
      case CREATE_ORDER_FAILED: {
        return { 
            ...state, 
            orderFailed: true, 
            orderRequest: false 
        };
      }
    default: {
        return state
    }
  }
} 


