import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import burgerConstructorStyles from './burger-constructor.module.css';
import IngredientCard from './ingredient-card/ingredient-card';
import OrderDetails from '../modal/order-details/order-details';
import Modal from '../modal/modal';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { UPDATE_BUN, ADD_INGREDIENT, INCREMENT_PRICE, DECREMENT_PRICE, MOVE_INGREDIENT } from '../../services/actions/burger-constructor';
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { createOrder } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { LOGIN_ROUTE } from '../../utils/routes';
import { useNavigate } from 'react-router-dom';


const BurgerConstructor = () => {
    const {  ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);
    const { price } = useSelector(state => state.ingredientsPrice);
    const { constructorIngredients } = useSelector(state => state.constructorIngredients);
    const [visible, setVisible] = React.useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDrop = (ingredient) => {
        if (ingredient.type === 'bun') {
            dispatch({
                type: DECREMENT_PRICE,
                price: constructorIngredients[0].price * 2
            })
            dispatch({
                type: UPDATE_BUN,
                bun: ingredient
            })
            dispatch({
                type: INCREMENT_PRICE,
                price: ingredient.price * 2
            })
        } else {
            dispatch({
                type: ADD_INGREDIENT,
                ingredient: ingredient,
                uniq_id: uuidv4()
            })
            dispatch({
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

    const createOrderHandler = () => {
        if (getCookie('refreshToken')) {
            const ingredient_ids = constructorIngredients.map((ingredient) => ingredient._id)
            ingredient_ids.push(ingredient_ids[0])
            dispatch(createOrder(ingredient_ids))
            handleModalToggle()
        } else {
            navigate(`/${LOGIN_ROUTE}`)
        }
        
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
                                uniq_id={ingredient?.uniq_id}
                                key={ingredient?.uniq_id}
                                index={index}
                                text={ingredient?.name}
                                price={ingredient?.price}
                                img={ingredient?.image}
                                moveCard={moveCard}
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
                            <p className='text text_type_digits-medium'>{price}</p>
                            <CurrencyIcon type='primary'/>
                        </div>
                        <Button htmlType='button' type='primary' size='large' onClick={createOrderHandler}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </>
        )
    }
}

export default BurgerConstructor;