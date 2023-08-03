import { TOrder } from "../types/data";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_ERROR, TOrderDetailsActions } from "../actions/order-details";

type TData = {
  success: boolean;
  name: string;
  order: TOrder;
}

type TState = {
  orderRequest: boolean;
  orderFailed: boolean;
  data: TData | null;
}

const initialState: TState = {
    orderRequest: true,
    orderFailed: false,
    data: null
}

export const orderReducer = (state = initialState, action: TOrderDetailsActions): TState => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST: {
        return {
            ...state,
            orderRequest: true,
            orderFailed: false,
        };
      }
      case CREATE_ORDER_SUCCESS: {  
        if (action.data.success) {      
          return { 
              ...state, 
              data: action.data, 
              orderRequest: false,
          };
        } else {
          return { 
            ...state, 
            orderRequest: false,
            orderFailed: true
        };
        }
      }
      case CREATE_ORDER_ERROR: {
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


