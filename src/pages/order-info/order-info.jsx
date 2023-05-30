import AppHeader from "../../components/app-header/app-header";
import OrderInfo from "../../components/order-info/order-info";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActionTypes'
import { ALL_ORDERS_URL } from '../../utils/wsUrls'

export const OrderInfoPage = () => {
    const { ingredientsRequest } = useSelector(state => state.ingredients);
    const { wsConnected, wsGetData } = useSelector((store) => store.ws);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(wsConnectionStart(ALL_ORDERS_URL, null))
        
        return () => {
            dispatch(wsConnectionClosed());
        }
    }, [dispatch])

    if (!wsConnected || ingredientsRequest || !wsGetData) {
        return <p>Загрузка...</p>
    }

    return (
        <>
            <AppHeader/>
            <OrderInfo isModal={false}/>
        </>
    )
}