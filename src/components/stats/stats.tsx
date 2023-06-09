import statsStyles from './stats.module.css';
import { useSelector } from '../../hooks';
import cn from 'classnames';

const Stats = () => {
    const { wsConnected, doneOrders, pendingOrders, total, totalToday } = useSelector((store) => store.ws);

    if (!wsConnected) {
        return <p>Загрузка...</p>
    }

    return (
        <div className={statsStyles.stats}>
            <div className={statsStyles.ordersBoard}>
                <div className={statsStyles.wrapper}>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>
                    <div className={cn(statsStyles.doneOrders, statsStyles.scroll)}>
                        {doneOrders.map((order) => (
                            <p key={order._id} className='text text_type_digits-default mb-2'>{order.number}</p>
                        ))}
                    </div>
                </div>
                <div className={statsStyles.wrapper}>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>
                    <div className={statsStyles.scroll}>
                        {pendingOrders.map((order) => (
                            <p key={order._id} className='text text_type_digits-default mb-2'>{order.number}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`${statsStyles.completed}`}>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <p className={` ${statsStyles.number} text text_type_digits-large`}>{total}</p>
            </div>
            <div className={`${statsStyles.completed}`}>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className={` ${statsStyles.number} text text_type_digits-large`}>{totalToday}</p>
            </div>
        </div>
    )
}

export default Stats;