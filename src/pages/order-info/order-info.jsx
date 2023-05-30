import AppHeader from "../../components/app-header/app-header";
import OrderInfo from "../../components/order-info/order-info";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActionTypes'
import { ALL_ORDERS_URL, USER_ORDERS_URL } from '../../utils/wsUrls'
import { PROFILE_ROUTE } from "../../utils/routes";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

export const OrderInfoPage = () => {
    const { ingredientsRequest } = useSelector(state => state.ingredients);
    const { wsConnected, wsGetData } = useSelector((store) => store.ws);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes(PROFILE_ROUTE)) {
            dispatch(wsConnectionStart(USER_ORDERS_URL, getCookie('accessToken')))
        } else {
            dispatch(wsConnectionStart(ALL_ORDERS_URL, null))
        }
        
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