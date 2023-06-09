import styles from './orders-history.module.css'
import Orders from "../../components/orders/orders";
import { useDispatch, useSelector } from "../../hooks";
import { useEffect } from 'react'
import { wsConnectionStart, wsConnectionClosed } from "../../services/actions/wsActionTypes";
import { USER_ORDERS_URL } from "../../utils/wsUrls";
import { getCookie } from "../../utils/cookie";

export function OrdersHistoryPage() {
  const { wsConnected, wsGetData } = useSelector((store) => store.ws);
  const dispatch = useDispatch();
  useEffect(() => {
      const accessToken = getCookie('accessToken');
      dispatch(wsConnectionStart(USER_ORDERS_URL, accessToken ? accessToken : ''))
      
      return () => {
          dispatch(wsConnectionClosed());
      }
  }, [dispatch])

  if (!wsConnected || !wsGetData) {
    return <p>Загрузка...</p>
  }

  return (
    <div className={`${styles.content} mt-10`}>
      <div className={styles.wrapper}>
        <Orders withStatus={true}/>
      </div>
    </div>
  );
}