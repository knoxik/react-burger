import cardStyles from './order-card.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientIcon from '../../ingredient-icon/ingredient-icon';
import { useSelector } from 'react-redux';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames'

const OrderCard = ({order, withStatus}) => {
    const { ingredientsById } = useSelector((store) => store.ingredients);
    const ingredientIds = order.ingredients.slice(0, -1);
    const formattedDate = <FormattedDate date={new Date(order.createdAt)} />

    const priceCalculation = (ingredientIds) => {
        return ingredientIds.reduce((value, id) => {
            return ingredientsById[id].price + value;
        }, 0)
    }

    const orderStatusToString = (order) => {
        return order.status === 'done' ? 'Выполнен' : 'Готовится'
    }

    return (
        <div className={`${cardStyles.orderCard} p-6 mb-4`}>
            <div className={`${cardStyles.subtitle}`}>
                <p className='text text_type_digits-default'>#{order.number}</p>
                <p className='text text_type_main-default text_color_inactive'>{formattedDate} i-GMT+3</p>
            </div>
            <h1 className='text text_type_main-medium pt-6'>{order.name}</h1>
            {withStatus && <p className={cn(`text text_type_main-default mt-2`, {[cardStyles.status] : order.status === 'done'})}>{orderStatusToString(order)}</p>}
            <div className={`${cardStyles.result} pt-6`}>
                <div className={`${cardStyles.ingredients} pr-6`}>
                    {ingredientIds.slice(0, 6).map((id, index) => (
                        (index === 5 && ingredientIds.length > 6) ? 
                                        <IngredientIcon 
                                            name={ingredientsById[id].name} 
                                            image={ingredientsById[id].image_mobile}
                                            counter={ingredientIds.length - 5}
                                            zIndex={1}
                                            extraClass={cardStyles.imageWrapper}
                                            opacity='0.3'
                                            key={index}
                                        /> :
                            <IngredientIcon 
                                name={ingredientsById[id].name}
                                image={ingredientsById[id].image_mobile}
                                zIndex={6 - index}
                                extraClass={cardStyles.imageWrapper}
                                key={index}
                            />
                    ))}
                </div>
                <div className={cardStyles.price}>
                    <p className='text text_type_digits-default'>{priceCalculation(order.ingredients)}</p>
                    <CurrencyIcon type='primary'/>
                </div>
            </div>
        </div>
    )
}

export default OrderCard;