import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import Modal from '../modal/modal'

const ingredientsDataUrl = 'https://norma.nomoreparties.space/api/ingredients';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getIngredientsData = async () => {
  return await fetch(ingredientsDataUrl)
    .then(res => checkResponse(res))
}

const App = () => {
  const [ingredientsData, setingredientsData] = React.useState([])
  React.useEffect(() => {
    const getData = async () => {
      // loader();
      try {
        const { data } = await getIngredientsData();
        setingredientsData(data)
      }
      catch (error) {
        console.log(error)
      }
      finally {
        // remove loader
      }
    };
    getData();
    
  }, [])

  return (
    <>
    {/* <Modal/> */}
    <AppHeader/>
    <AppMain data={ingredientsData}/>
    </>
  );
}

export default App;
