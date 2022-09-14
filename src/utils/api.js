const ingredientsDataUrl = 'https://norma.nomoreparties.space/api/ingredients';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  throw `Ошибка: ${res.status}`;
}

export const getIngredientsData = async () => {
  return await fetch(ingredientsDataUrl)
    .then(res => checkResponse(res))
}