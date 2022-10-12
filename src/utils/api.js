import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from "../services/actions/burger-ingredients";
import { CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS } from "../services/actions/order-details";

const apiUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res, type, dispatch) => {
  if (res.ok) {
    return res.json();
  } else {
    dispatch({
      type: type
    })
  }
}


export function getIngredientsData () {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS
    })

    fetch(`${apiUrl}/ingredients`)
      .then(res => checkResponse(res, GET_INGREDIENTS_FAILED, dispatch))
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      })
  }
} 


export function createOrder (data) {
  return function(dispatch) {
    dispatch({
      type: CREATE_ORDER
    })

    fetch(`${apiUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: data
      })
    })
    .then(res => checkResponse(res, CREATE_ORDER_FAILED, dispatch))
    .then(res => {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        data: {
          name: res.name,
          order: res.order
        }
      })
    })
    .catch(err => {
      dispatch({
        type: CREATE_ORDER_FAILED
      })
    })
  }
} 