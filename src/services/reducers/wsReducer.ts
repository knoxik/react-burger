import { TOrder } from '../types/data';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    TWsActions
} from '../actions/wsActionTypes';

type TState = {
  wsConnected: boolean;
  wsGetData: boolean;
  total: number | undefined;
  totalToday: number | undefined;
  error: string | undefined;
  orders: Array<TOrder>;
  authOrders: Array<TOrder>;
  doneOrders: Array<TOrder>;
  pendingOrders: Array<TOrder>;
}
  
const initialState: TState = {
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
  
export const wsReducer = (state = initialState, action: TWsActions): TState => {
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
        error: action.message,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsGetData: false,
        error: undefined,
      };

    case WS_GET_MESSAGE:
      const doneOrders: Array<TOrder> = []
      const pendingOrders: Array<TOrder> = []
      let orders: Array<TOrder> = []
      let authOrders: Array<TOrder> = []
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