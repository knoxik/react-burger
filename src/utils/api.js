import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_ERROR, GET_INGREDIENTS_SUCCESS } from "../services/actions/burger-ingredients";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_ERROR, CREATE_ORDER_SUCCESS } from "../services/actions/order-details";
import { USER_REGISTER_FORM_SUBMIT, USER_REGISTER_FORM_SUBMIT_FAILED, USER_REGISTER_FORM_SUBMIT_SUCCESS } from "../services/actions/register";
import { USER_LOGIN_FORM_SUBMIT, USER_LOGIN_FORM_SUBMIT_FAILED, USER_LOGIN_FORM_SUBMIT_SUCCESS } from "../services/actions/login-form";
import { FORGOT_PASSWORD_FORM_SUBMIT, FORGOT_PASSWORD_FORM_SUBMIT_FAILED, FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS } from "../services/actions/forgot-password";
import { RESET_PASSWORD_FORM_SUBMIT, RESET_PASSWORD_FORM_SUBMIT_FAILED, RESET_PASSWORD_FORM_SUBMIT_SUCCESS } from "../services/actions/reset-password";
import { SET_USER_DATA, GET_USER_REQUEST, GET_USER_ERROR, GET_USER_SUCCESS, DELETE_USER_DATA } from "../services/actions/user-data";
import { PROFILE_INFO_FORM_SUBMIT, PROFILE_INFO_FORM_SUBMIT_FAILED, PROFILE_INFO_FORM_SUBMIT_SUCCESS } from "../services/actions/profile-info";
import { setCookie, getAccessTokenValue, getCookie, deleteCookie } from "./cookie";

const API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(err => Promise.reject(err))
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

    if (getCookie('refreshToken')) {
      fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getCookie('accessToken')
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
        if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
          refreshToken().then(res => {
            dispatch(createOrder(data))
          })
        } else {
          dispatch({
            type: CREATE_ORDER_ERROR
          })
        }
      })
    } else {
      dispatch({
        type: CREATE_ORDER_ERROR
      })
    }
  }
} 

export function createUser (form, callback) {
  return function(dispatch) {
    dispatch({
      type: USER_REGISTER_FORM_SUBMIT
    })

    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        name: form.name
      })
    })
    .then(res => checkResponse(res))
    .then(res => {
      setCookie('accessToken', getAccessTokenValue(res.accessToken));
      setCookie('refreshToken', res.refreshToken);
      dispatch({
        type: USER_REGISTER_FORM_SUBMIT_SUCCESS,
        data: res
      })
      dispatch({
        type: SET_USER_DATA,
        data: res.user
      })
      callback()
    })
    .catch(err => {
      dispatch({
        type: USER_REGISTER_FORM_SUBMIT_FAILED
      })
    })
  }
} 


export function authUser (form, callback) {
  return function(dispatch) {
    dispatch({
      type: USER_LOGIN_FORM_SUBMIT
    })

    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      })
    })
    .then(res => checkResponse(res))
    .then(res => {
      setCookie('accessToken', getAccessTokenValue(res.accessToken));
      setCookie('refreshToken', res.refreshToken);
      dispatch({
        type: USER_LOGIN_FORM_SUBMIT_SUCCESS,
        data: res
      })
      dispatch({
        type: SET_USER_DATA,
        data: res
      })
      callback()
    })
    .catch(err => {
      dispatch({
        type: USER_LOGIN_FORM_SUBMIT_FAILED
      })
    })
  }
} 

export function getUserData () {
  return function(dispatch) {
    if (getCookie('refreshToken')) {
      dispatch({
        type: GET_USER_REQUEST
      })
      fetch(`${API_URL}/auth/user`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken')
          },
        })
        .then(res => checkResponse(res))
        .then(res => {
          dispatch({
            type: GET_USER_SUCCESS,
            data: res
          })
        })
        .catch(err => {
          if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
            refreshToken().then(res => {
              dispatch(getUserData())
            })
          } else {
            dispatch({
              type: GET_USER_ERROR
            })
          }
        })
    } else {
      dispatch({
        type: GET_USER_ERROR
      })
    }
  }
}

export function refreshToken () {
  return fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getCookie('refreshToken'),
    })
  })
  .then(res => checkResponse(res))
  .then(res => {
      setCookie('accessToken', getAccessTokenValue(res.accessToken));
      setCookie('refreshToken', res.refreshToken);
  })
}

export function forgotPassword (form, callback) {
  return function(dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_FORM_SUBMIT
    })

    fetch(`${API_URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.email,
      })
    })
    .then(res => checkResponse(res))
    .then(res => {
      dispatch({
        type: FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS,
        data: res
      })
      callback()
    })
    .catch(err => {
      dispatch({
        type: FORGOT_PASSWORD_FORM_SUBMIT_FAILED
      })
    })
  }
} 

export function resetPassword (form, callback) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_FORM_SUBMIT
    })

    fetch(`${API_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: form.code,
        password: form.password
      })
    })
    .then(res => checkResponse(res))
    .then(res => {
      dispatch({
        type: RESET_PASSWORD_FORM_SUBMIT_SUCCESS,
        data: res
      })
      callback()
    })
    .catch(err => {
      dispatch({
        type: RESET_PASSWORD_FORM_SUBMIT_FAILED
      })
    })
  }
} 

export function updateUserData (form) {
  return function(dispatch) {
    if (getCookie('refreshToken')) {
      dispatch({
        type: PROFILE_INFO_FORM_SUBMIT
      })
      fetch(`${API_URL}/auth/user`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken')
          },
          body: JSON.stringify(form)
        })
        .then(res => checkResponse(res))
        .then(res => {
          dispatch({
            type: PROFILE_INFO_FORM_SUBMIT_SUCCESS,
            data: res
          })
          dispatch({
            type: SET_USER_DATA,
            data: res
          })
        })
        .catch(err => {
          if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
            refreshToken().then(res => {
              dispatch(updateUserData())
            })
          } else {
            dispatch({
              type: PROFILE_INFO_FORM_SUBMIT_FAILED
            })
          }
        })
    } else {
      dispatch({
        type: PROFILE_INFO_FORM_SUBMIT_FAILED
      })
    }
  }
}

export function deleteUserData () {
  return function(dispatch) {
    if (getCookie('refreshToken')) {
      fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: getCookie('refreshToken')
          })
        })
        .then(res => checkResponse(res))
        .then(res => {
          dispatch({
            type: DELETE_USER_DATA
          })
          deleteCookie('refreshToken')
          deleteCookie('accessToken')
          
        })
        .catch(err => console.log(err))
    } else {
        console.log('err')
    }
  }
}