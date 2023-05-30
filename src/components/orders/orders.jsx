import orderStyles from './orders.module.css'
import OrderCard from './order-card/order-card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Orders = ({withStatus}) => {
    const { wsConnected, orders } = useSelector((store) => store.ws);
    const location = useLocation();

    if (!wsConnected) {
        return <p>Загрузка...</p>
    }

    return (
        <>
        {orders.map((order) => (
            <Link key={order._id} to={`${order._id}`} className={orderStyles.link} state={{background: location, number: order.number}}>
                <OrderCard key={order._id} order={order} withStatus={withStatus}/>
            </Link>
        ))}
        </>
    )
}

export default Orders;