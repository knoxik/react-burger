import { refreshToken } from "../../utils/api";
import { Middleware } from "@reduxjs/toolkit";
import { TWebSocket } from "../types/data";

export const socketMiddleware = (wsActions: TWebSocket): Middleware => {
    return store => {
      let socket: WebSocket | null = null;
  
      return next => action => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

        if (type === wsInit) {
          socket = new WebSocket(payload);
        }
        if (socket && type === onClose) {
          socket.close()
        }
        if (socket) {
          socket.onopen = event => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = event => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = event => {
            const currentTarget = event.currentTarget as WebSocket
            const isAuth = currentTarget.url.includes('token')
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;

            if (restParsedData.message === 'Invalid or missing token' || 
                restParsedData.message === 'jwt expired') {
                  refreshToken();
            } else {
              dispatch({ type: onMessage, payload: {...restParsedData, isAuth} });
            }
          };
  
          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
        }
  
        next(action);
      };
    };
  };