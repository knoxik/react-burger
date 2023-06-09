import { TOrder, TWebSocket } from "../types/data";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

type TData = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  isAuth: boolean;
}

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly message: string;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TData;
}

export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string;
}

export type TWsActions = 
  | IWsSendMessageAction
  | IWsGetMessageAction
  | IWsConnectionClosedAction
  | IWsConnectionErrorAction
  | IWsConnectionSuccessAction
  | IWsConnectionStartAction

export const wsActions: TWebSocket = {
    wsInit: WS_CONNECTION_START,  
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
};

export const wsConnectionStart = (url: string, token: string): IWsConnectionStartAction => {
    const wsUrl = token ? `${url}?token=${token}` : url
    return {
      type: WS_CONNECTION_START,
      payload: wsUrl,
    };
  };

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
    return {
      type: WS_CONNECTION_SUCCESS
    };
  };
  
  export const wsConnectionError = (message: string): IWsConnectionErrorAction => {
    return {
      type: WS_CONNECTION_ERROR,
      message: message
    };
  };
  
  export const wsConnectionClosed = (): IWsConnectionClosedAction => {
    return {
      type: WS_CONNECTION_CLOSED
    };
  };
  
  export const wsGetMessage = (message: TData): IWsGetMessageAction => {
    return {
      type: WS_GET_MESSAGE,
      payload: message
    };
  };
  
  export const wsSendMessage = (message: string): IWsSendMessageAction => {
    return {
      type: WS_SEND_MESSAGE,
      payload: message
    };
  };