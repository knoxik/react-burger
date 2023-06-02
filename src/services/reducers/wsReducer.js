import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../actions/wsActionTypes';
  
  const initialState = {
    wsConnected: false,
    wsGetData: false,
    orders: [],
    authOrders: [],
    doneOrders: [],
    pendingOrders: [],
    total: undefined,
    totalToday: undefined,
    error: undefined
  };
  
  export const wsReducer = (state = initialState, action) => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true,
          error: undefined,
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false,
          wsGetData: false,
          error: action.payload,
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false,
          wsGetData: false,
          error: undefined,
        };
  
      case WS_GET_MESSAGE:
        const doneOrders = []
        const pendingOrders = []
        let orders = []
        let authOrders = []
        action.payload.orders.forEach((order) => {
            if (order.status === 'done') {
                doneOrders.push(order)
            } else {
                pendingOrders.push(order)
            }
        })

        if (action.payload.isAuth) {
          authOrders = action.payload.orders
        } else {
          orders = action.payload.orders
        }

        return {
          ...state,
          wsGetData: true,
          orders: orders,
          authOrders: authOrders,
          doneOrders: doneOrders,
          pendingOrders: pendingOrders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          error: undefined,
        };
  
      default:
        return state;
    }
  };