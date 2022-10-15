import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_ERROR, GET_INGREDIENTS_SUCCESS } from "../services/actions/burger-ingredients";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_ERROR, CREATE_ORDER_SUCCESS } from "../services/actions/order-details";

const API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  throw `Ошибка: ${res.status}`;
}


export function getIngredientsData () {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })

    fetch(`${API_URL}/ingredients`)
      .then(res => checkResponse(res))
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_INGREDIENTS_ERROR
        })
      })
  }
} 


export function createOrder (data) {
  return function(dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST
    })

    fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: data
      })
    })
    .then(res => checkResponse(res))
    .then(res => {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        data: res
      })
    })
    .catch(err => {
      dispatch({
        type: CREATE_ORDER_ERROR
      })
    })
  }
} 