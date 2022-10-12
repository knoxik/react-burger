import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import burgerConstructorStyles from './burger-constructor.module.css';
import IngredientCard from './ingredient-card/ingredient-card';
import OrderDetails from '../modal/order-details/order-details';
import Modal from '../modal/modal';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { UPDATE_BUN, ADD_BUN, ADD_INGREDIENT, INCREMENT_PRICE, DECREMENT_PRICE, MOVE_INGREDIENT } from '../../services/actions/burger-constructor';
import { initialPrice, ingredientsPriceReducer } from '../../services/reducers/burger-constructor';
import { useDrop } from "react-dnd";


const BurgerConstructor = () => {
    const {  ingredientsRequest, ingredientsFailed, bunList } = useSelector(state => state.ingredients);
    const { constructorIngredients } = useSelector(state => state.constructorIngredients);

    const [visible, setVisible] = React.useState(false)

    const dispatch = useDispatch();
    const [priceState, priceDispatch] = React.useReducer(ingredientsPriceReducer, initialPrice);
    React.useEffect(() => {
        if (constructorIngredients.length == 0 && bunList.length != 0) {
            dispatch({
                type: ADD_BUN,
                bun: bunList[0]
            })
            priceDispatch({
                type: INCREMENT_PRICE,
                price: bunList[0].price * 2
            })
        }
    }, [bunList])
    

    const handleDrop = (ingredient) => {
        if (ingredient.type === 'bun') {
            priceDispatch({
                type: DECREMENT_PRICE,
                price: constructorIngredients[0].price * 2
            })
            dispatch({
                type: UPDATE_BUN,
                bun: ingredient
            })
            priceDispatch({
                type: INCREMENT_PRICE,
                price: ingredient.price * 2
            })
        } else {
            dispatch({
                type: ADD_INGREDIENT,
                ingredient: ingredient
            })
            priceDispatch({
                type: INCREMENT_PRICE,
                price: ingredient.price
            })
        }
    }

    const moveCard = React.useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_INGREDIENT,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex
        })
      }, [])

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(ingredient) {
            handleDrop(ingredient);
        },
    });
    
    const handleModalToggle = () => {
        setVisible(!visible);
    }

    if (ingredientsFailed) {
        return <p>Произошла ошибка при получении данных</p>
    } else if (ingredientsRequest) {
        return <p>Загрузка...</p>
    } else {
        return (
            <>
                {visible && (
                    <Modal onClose={handleModalToggle}>
                        <OrderDetails/>
                    </Modal>
                )}   
                <div className={burgerConstructorStyles.constructor} ref={dropTarget}>
                    <div className='pl-4'>
                        <ConstructorElement
                            type='top'
                            isLocked
                            text={`${constructorIngredients[0]?.name} (верх)`}
                            price={constructorIngredients[0]?.price}
                            thumbnail={constructorIngredients[0]?.image}
                        />
                    </div>
                    <div className={burgerConstructorStyles.ingredientCardList}>
                        {constructorIngredients.map((ingredient, index) => (
                            ingredient?.type !== 'bun' && (
                            <IngredientCard 
                                id={ingredient?._id}
                                key={index}
                                index={index}
                                text={ingredient?.name}
                                price={ingredient?.price}
                                img={ingredient?.image}
                                moveCard={moveCard}
                                priceDispatch={priceDispatch}
                            />)
                        ))}          
                    </div>
                    
                    <div className='pl-4'>
                        <ConstructorElement
                            type='bottom'
                            isLocked
                            text={`${constructorIngredients[0]?.name} (низ)`}
                            price={constructorIngredients[0]?.price}
                            thumbnail={constructorIngredients[0]?.image}
                        />
                    </div>
    
                    <div className={`${burgerConstructorStyles.order} mt-10 pr-4`}>
                        <div className={`${burgerConstructorStyles.price} mr-10`}>
                            <p className='text text_type_digits-medium'>{priceState.price}</p>
                            <CurrencyIcon type='primary'/>
                        </div>
                        <Button type='primary' size='large' onClick={handleModalToggle}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </>
        )
    }
}

export default BurgerConstructor;