import orderStyles from './order-details.module.css'
import successOrderImage from '../../../images/done.svg'

const OrderDetails = () => {
    return (
        <div className={orderStyles.content}>
            <h3 className={`${orderStyles.number} text text_type_digits-large pt-30`}>034536</h3>
            <p className={`text text_type_main-medium pt-8`}>идентификатор заказа</p>
            <img className={`pt-15`} src={successOrderImage} alt='Успешный заказ иконка'/>
            <p className={`text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive pt-2 pb-30`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;