import orderInfoStyles from './order-info.module.css'
import IngredientIcon from '../ingredient-icon/ingredient-icon'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from '../../hooks'
import { useMemo, useState, FC } from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { PROFILE_ROUTE } from '../../utils/routes'
import { TIngredient, TOrder } from '../../services/types/data'

type Props = {
    isModal?: boolean;
}

const OrderInfo: FC<Props> = ({ isModal }) => {
    const { id } = useParams();  
    const { orders, authOrders } = useSelector((store) => store.ws);
    const { ingredientsById } = useSelector((store) => store.ingredients)
    const location = useLocation();
    
    let order = location.pathname.includes(PROFILE_ROUTE) 
                    ? authOrders.find((order) => order._id === id) 
                    : orders.find((order) => order._id === id);
       
    const formattedDate = order ? <FormattedDate date={new Date(order.createdAt)} /> : ''
    const [price, setPrice] = useState(0)

    const orderStatusToString = (order: TOrder) => {
        return order.status === 'done' ? 'Выполнен' : 'Готовится'
    }

    const getUniqIngredients = (ingredientIds: string[] | undefined) => {
        const uniqIngredients: Array<TIngredient & {count: number}> = [];
        const ingredientsCount: {[id: string]: {count: number, index: number}} = {};
        let price = 0
        if (ingredientIds) {
            ingredientIds.forEach((id, index) => {
                if (ingredientsCount[id]) {
                    ingredientsCount[id] = {...ingredientsCount[id], count: ingredientsCount[id].count += 1}
                    uniqIngredients[ingredientsCount[id].index].count = ingredientsCount[id].count
                } else {
                    ingredientsCount[id] = {count: 1, index: index}
                    uniqIngredients.push({...ingredientsById[id], count: 1})
                }
                price += ingredientsById[id].price;
                
            })
            setPrice(price)
            return uniqIngredients
        }
        return []
    }

    const memoUniqIngredients = useMemo(() => getUniqIngredients(order?.ingredients), [order])

    return (
        order ? (<div className={orderInfoStyles.content}>
            {!isModal && (<p className={`${orderInfoStyles.number} text text_type_digits-default mt-30`}>#{order.number}</p>)}
            <h1 className='text text_type_main-medium mt-10'>{order.name}</h1>
            <p className={cn(`text text_type_main-default mt-3`, {[orderInfoStyles.status] : order.status === 'done'})}>{orderStatusToString(order)}</p>
            <p className='text text_type_main-medium mt-15 mb-6'>Состав:</p>
            <div className={orderInfoStyles.list}>
                {memoUniqIngredients.map((ingredient) => (
                    <div className={orderInfoStyles.ingredient} key={ingredient._id}>
                        <IngredientIcon 
                            name={ingredient.name}
                            image={ingredient.image_mobile}
                        />
                        <p className='text text_type_main-default'>{ingredient.name}</p>
                        <div className={orderInfoStyles.price}>
                            <p className='text text_type_digits-default'>{ingredient.count} x {ingredient.price}</p>
                            <CurrencyIcon type='primary'/>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${orderInfoStyles.result} mb-10 mt-10`}>
                <div>
                    <p className='text text_type_main-default text_color_inactive'>{formattedDate} i-GMT+3</p>
                </div>
                
                <div className={orderInfoStyles.price}>
                    <p className='text text_type_digits-default'>{price}</p>
                    <CurrencyIcon type='primary'/>
                </div>
            </div>
        </div>): <div></div>
    )
}

export default OrderInfo