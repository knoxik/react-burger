import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import IngredientCard from './ingredient-card/ingredient-card';
import OrderDetails from '../modal/order-details/order-details';
import Modal from '../modal/modal';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/propTypes';


const BurgerConstructor = ({ingredientList}) => {
    const [visible, setVisible] = React.useState(false)
    
    const handleModalToggle = () => {
        setVisible(!visible);
    }

    return (
        <>
            {visible && (
                <Modal onClose={handleModalToggle}>
                    <OrderDetails/>
                </Modal>
            )}   
            <div className={burgerConstructorStyles.constructor}>
                <div className='pl-4'>
                    <ConstructorElement
                        type='top'
                        isLocked
                        text={`${ingredientList[0]?.name} (верх)`}
                        price={ingredientList[0]?.price}
                        thumbnail={ingredientList[0]?.image}
                    />
                </div>
                <div className={burgerConstructorStyles.ingredientCardList}>
                    {ingredientList.map((ingredient) => (
                        ingredient.type !== 'bun' && (
                        <IngredientCard 
                            key={ingredient._id}
                            text={ingredient.name}
                            price={ingredient.price}
                            img={ingredient.image}
                        />)
                    ))}          
                </div>
                
                <div className='pl-4'>
                    <ConstructorElement
                        type='bottom'
                        isLocked
                        text={`${ingredientList[0]?.name} (низ)`}
                        price={ingredientList[0]?.price}
                        thumbnail={ingredientList[0]?.image}
                    />
                </div>

                <div className={`${burgerConstructorStyles.order} mt-10 pr-4`}>
                    <div className={`${burgerConstructorStyles.price} mr-10`}>
                        <p className='text text_type_digits-medium'>610</p>
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

BurgerConstructor.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgerConstructor;