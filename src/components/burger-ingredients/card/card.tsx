import React, {FC, MutableRefObject} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './card.module.css';
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from '../../../hooks';
import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from '../../../services/actions/ingredient-details';
import { Link, useLocation } from 'react-router-dom';
import { INGREDIENTS_ROUTE } from '../../../utils/routes';
import { TIngredient } from '../../../services/types/data';

type TCardListProps = {
    headline: string;
    ingredientList: Array<TIngredient>;
};

type TCardProps = {
    ingredient: TIngredient
};

export const CardList = React.forwardRef<HTMLHeadingElement, TCardListProps>(({headline, ingredientList}, ref) => {
    return (
        <div>
            <h2 ref={ref} className='text text_type_main-medium'>{headline}</h2>
            <div className={cardStyles.cardList}>
                {ingredientList.map((ingredient) => (
                    <Card key={ingredient._id} ingredient={ingredient}/>
                ))}
            </div>
        </div>
    )
})

const Card: FC<TCardProps> = ({ingredient}) => {
    const [visible, setVisible] = React.useState(false)
    const { constructorIngredients } = useSelector(state => state.constructorIngredients);
    const ingredientCount = getIngredientCount(ingredient._id, constructorIngredients)
    const dispatch = useDispatch();
    const location = useLocation();

    const openModal = () => {
        dispatch({
            type: ADD_INGREDIENT_DETAILS,
            payload: ingredient
        })
        setVisible(!visible);
    }

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient
    });

    return (
        <>
            <Link to={`/${INGREDIENTS_ROUTE}/${ingredient._id}`} state={{background: location}} onClick={openModal} className={cardStyles.link}>
                <div className={cardStyles.card + ' mt-6 mb-10'} ref={dragRef}>
                    {ingredientCount !== 0 && (<Counter count={ingredientCount} size="default" />)}
                    <img className={`${cardStyles.cardImage} pl-4 pr-4`} src={ingredient.image_large} alt={ingredient.name}/>
                    <div className={`${cardStyles.cardPrice} pt-1 pb-1`}>
                        <p className='text text_type_digits-default'>{ingredient.price}</p>
                        <CurrencyIcon type='primary' />
                    </div>
                    <p className={`${cardStyles.cardName} text text_type_main-default`}>{ingredient.name}</p>
                </div>
            </Link>
        </>
    )
}

const getIngredientCount = (ingredientId: string, constructorIngredients: Array<TIngredient>) => {
    return constructorIngredients.reduce((previousValue, currentIngredient) => {
        return ingredientId === currentIngredient._id && currentIngredient.type === 'bun' ? previousValue + 2 : 
               ingredientId === currentIngredient._id ? previousValue + 1 : previousValue
    }, 0)
}

