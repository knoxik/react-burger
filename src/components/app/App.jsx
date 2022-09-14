import React from 'react';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import { getIngredientsData } from '../../utils/api'

const App = () => {
  const [ingredientsData, setIngredientsData] = React.useState([])
  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getIngredientsData();
        setIngredientsData(data)
      }
      catch (error) {
        console.log(error)
      }
    };
    getData();
    
  }, [])

  return (
    <>
    <AppHeader/>
    <AppMain ingredientList={ingredientsData}/>
    </>
  );
}

export default App;
