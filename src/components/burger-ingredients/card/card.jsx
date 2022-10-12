import React from 'react';
import Modal from '../../modal/modal';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './card.module.css';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../../utils/propTypes';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';


export const CardList = ({headline, refProp, ingredientList}) => {
    return (
        <div>
            <h2 ref={refProp} className='text text_type_main-medium'>{headline}</h2>
            <div className={cardStyles.cardList}>
                {ingredientList.map((ingredient) => (
                    <Card key={ingredient._id} ingredient={ingredient}/>
                ))}
            </div>
        </div>
    )
}

const Card = ({ingredient}) => {
    const [visible, setVisible] = React.useState(false)
    const { constructorIngredients } = useSelector(state => state.constructorIngredients);
    const ingredientCount = getIngredientCount(ingredient._id, constructorIngredients)
    
    const handleModalToggle = () => {
        setVisible(!visible);
    }

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    });

    return (
        <>
            {visible && (
                <Modal title='Детали ингредиента' onClose={handleModalToggle}>
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            )}
            <div className={cardStyles.card + ' mt-6 mb-10'} onClick={handleModalToggle} ref={dragRef}>
                {ingredientCount !== 0 && (<Counter count={ingredientCount} size="default" />)}
                <img className={`${cardStyles.cardImage} pl-4 pr-4`} src={ingredient.image_large} alt={ingredient.name}/>
                <div className={`${cardStyles.cardPrice} pt-1 pb-1`}>
                    <p className='text text_type_digits-default'>{ingredient.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <p className={`${cardStyles.cardName} text text_type_main-default`}>{ingredient.name}</p>
            </div>
        </>
    )
}

const getIngredientCount = (ingredientId, constructorIngredients) => {
    return constructorIngredients.reduce((previousValue, currentIngredient) => {
        return ingredientId === currentIngredient._id && currentIngredient.type === 'bun' ? previousValue + 2 : 
               ingredientId === currentIngredient._id ? previousValue + 1 : previousValue
    }, 0)
}

Card.propTypes = {
    ingredient: ingredientPropTypes.isRequired
};

CardList.propTypes = {
    headline: PropTypes.string.isRequired,
    refProp: PropTypes.object.isRequired,
    ingredientList: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};