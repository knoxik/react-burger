import orderStyles from './order-details.module.css'
import successOrderImage from '../../../images/done.svg'
import { useSelector } from 'react-redux';

const OrderDetails = () => {
    const { data, orderRequest, orderFailed } = useSelector(state => state.order);

    if (orderFailed) {
        return (
            <div className={orderStyles.content}>
                <p className={`text text_type_main-medium pt-30 pb-30`}>Ошибка создания заказа</p>
            </div>
        )
    } else if (orderRequest) {
        return (
            <div className={orderStyles.content}>
                <p className={`text text_type_main-medium pt-30 pb-30`}>Создание заказа...</p>
            </div>
        )
    } else {
        return (
            <div className={orderStyles.content}>
                <h3 className={`${orderStyles.number} text text_type_digits-large pt-30`}>{data.order.number}</h3>
                <p className={`text text_type_main-medium pt-8`}>идентификатор заказа</p>
                <img className={`pt-15`} src={successOrderImage} alt='Успешный заказ иконка'/>
                <p className={`text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
                <p className={`text text_type_main-default text_color_inactive pt-2 pb-30`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        )
    }
}

export default OrderDetails;