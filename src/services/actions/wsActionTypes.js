export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const wsActions = {
    wsInit: WS_CONNECTION_START,  
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
};

export const wsConnectionStart = (url, token) => {
    const wsUrl = token ? `${url}?token=${token}` : url
    return {
      type: WS_CONNECTION_START,
      payload: wsUrl,
    };
  };

export const wsConnectionSuccess = () => {
    return {
      type: WS_CONNECTION_SUCCESS
    };
  };
  
  export const wsConnectionError = () => {
    return {
      type: WS_CONNECTION_ERROR
    };
  };
  
  export const wsConnectionClosed = () => {
    return {
      type: WS_CONNECTION_CLOSED
    };
  };
  
  export const wsGetMessage = message => {
    return {
      type: WS_GET_MESSAGE,
      payload: message
    };
  };
  
  export const wsSendMessage = message => {
    return {
      type: WS_SEND_MESSAGE,
      payload: message
    };
  };