import orderStyles from './orders.module.css'
import OrderCard from './order-card/order-card';
import { useSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../utils/routes';
import { FC } from 'react';

type Props = {
    withStatus?: boolean;
}

const Orders: FC<Props> = ({withStatus}) => {
    const { wsConnected, authOrders, orders } = useSelector((store) => store.ws);
    const location = useLocation();

    let currentOrders = []
    if (location.pathname.includes(PROFILE_ROUTE)) {
        currentOrders = authOrders;
    } else {
        currentOrders = orders;
    }

    if (!wsConnected) {
        return <p>Загрузка...</p>
    }

    return (
        <>
        {currentOrders.map((order) => (
            <Link key={order._id} to={`${order._id}`} className={orderStyles.link} state={{background: location, number: order.number}}>
                <OrderCard key={order._id} order={order} withStatus={withStatus}/>
            </Link>
        ))}
        </>
    )
}

export default Orders;