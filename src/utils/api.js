const apiUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  throw `Ошибка: ${res.status}`;
}

export const getIngredientsData = () => {
  return fetch(`${apiUrl}/ingredients`)
    .then(res => checkResponse(res))
}