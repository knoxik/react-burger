import React from 'react';
import BurgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data'

const IngredientCard = ({text, price, img}) => {
    return (
        <div className={BurgerConstructorStyles.card}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={text}
                price={price}
                thumbnail={img}
            />
        </div>
    )
}

const BurgerConstructor = () => {
    return (
        <div className={BurgerConstructorStyles.constructor}>
            <div className='pl-4'>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={data[0].image}
                />
            </div>
            <div className={BurgerConstructorStyles.ingredientCardList}>
                <IngredientCard 
                    text={data[1].name}
                    price={data[1].price}
                    img={data[1].image}
                />
                <IngredientCard 
                    text={data[2].name}
                    price={data[2].price}
                    img={data[2].image}
                />
                <IngredientCard 
                    text={data[5].name}
                    price={data[5].price}
                    img={data[5].image}
                />
                <IngredientCard 
                    text={data[5].name}
                    price={data[5].price}
                    img={data[5].image}
                />
                <IngredientCard 
                    text={data[4].name}
                    price={data[4].price}
                    img={data[4].image}
                />
                <IngredientCard 
                    text={data[4].name}
                    price={data[4].price}
                    img={data[4].image}
                />
                
            </div>
            
            <div className='pl-4'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={data[0].image}
                />
            </div>

            <div className='mt-10 pr-4' style={{alignSelf: 'self-end', display: 'flex', alignItems: 'center'}}>
                <div className='mr-10' style={{display: 'flex', alignItems: 'center', columnGap: 9}}>
                    <p className='text text_type_digits-medium'>610</p>
                    <CurrencyIcon type='primary'/>
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;