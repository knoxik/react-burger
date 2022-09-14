import React from 'react';
import Tabs from './tabs/tabs';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { CardList } from './card/card';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/propTypes';


const executeScroll = (ref) => {
    ref.current.scrollIntoView({block: 'start', behavior: 'smooth'});
}

const BurgerIngredients = ({ingredientList}) => {
    const bunRef = React.useRef();
    const sauseRef = React.useRef();
    const mainRef = React.useRef();

    const bunList = [];
    const sauceList = [];
    const mainList = [];

    React.useMemo(() => {
        ingredientList.forEach((ingredient) => {
            switch(ingredient.type) {
                case 'bun':
                    bunList.push(ingredient)
                    break;
                case 'sauce':
                    sauceList.push(ingredient)
                    break;
                case 'main':
                    mainList.push(ingredient)
                    break;
            }
        })
    }, [ingredientList])

    

    return (
        <>
        <Tabs scrollHandler={executeScroll} bunRef={bunRef} sauseRef={sauseRef} mainRef={mainRef}/>    
        <div className={`${burgerIngredientsStyles.ingredients} mt-10 mb-4`}>
            <CardList refProp={bunRef} headline='Булки' ingredientList={bunList}/>
            <CardList refProp={sauseRef} headline='Соусы' ingredientList={sauceList}/>
            <CardList refProp={mainRef} headline='Начинки' ingredientList={mainList}/>
        </div>
        </>
    )
}

BurgerIngredients.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};

export default BurgerIngredients;