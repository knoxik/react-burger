import React from 'react';
import Tabs from './tabs/tabs';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { CardList } from './card/card';
import { data } from '../../utils/data';


const executeScroll = (ref) => {
    ref.current.scrollIntoView({block: 'start', behavior: 'smooth'});
}

const BurgerIngredients = () => {
    const bunRef = React.useRef();
    const sauseRef = React.useRef();
    const mainRef = React.useRef();

    const bunList = data.filter(ingredient => ingredient.type === 'bun')
    const sauceList = data.filter(ingredient => ingredient.type === 'sauce')
    const mainList = data.filter(ingredient => ingredient.type === 'main')

    return (
        <>
        <Tabs scrollHandler={executeScroll} bunRef={bunRef} sauseRef={sauseRef} mainRef={mainRef}/>    
        <div className={`${burgerIngredientsStyles.ingredients} mt-10 mb-4`}>
            <CardList refProp={bunRef} headline='Булки' Ingredientlist={bunList}/>
            <CardList refProp={sauseRef} headline='Соусы' Ingredientlist={sauceList}/>
            <CardList refProp={mainRef} headline='Начинки' Ingredientlist={mainList}/>
        </div>
        </>
    )
}

export default BurgerIngredients;