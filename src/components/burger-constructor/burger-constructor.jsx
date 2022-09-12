import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import IngredientCard from './ingredient-card/ingredient-card';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data';

const BurgerConstructor = ({ingredientList}) => {
    return (
        <div className={burgerConstructorStyles.constructor}>
            <div className='pl-4'>
                <ConstructorElement
                    type='top'
                    isLocked
                    text='Краторная булка N-200i (верх)'
                    price={200}
                    thumbnail={data[0].image}
                />
            </div>
            <div className={burgerConstructorStyles.ingredientCardList}>
                {ingredientList.map((ingredient) => (
                    <IngredientCard 
                        key={ingredient._id}
                        text={ingredient.name}
                        price={ingredient.price}
                        img={ingredient.image}
                    />
                ))}          
            </div>
            
            <div className='pl-4'>
                <ConstructorElement
                    type='bottom'
                    isLocked
                    text='Краторная булка N-200i (низ)'
                    price={200}
                    thumbnail={data[0].image}
                />
            </div>

            <div className={`${burgerConstructorStyles.order} mt-10 pr-4`}>
                <div className={`${burgerConstructorStyles.price} mr-10`}>
                    <p className='text text_type_digits-medium'>610</p>
                    <CurrencyIcon type='primary'/>
                </div>
                <Button type='primary' size='large'>
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;