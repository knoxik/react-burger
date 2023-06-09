import feedStyles from './feed.module.css'
import AppHeader from '../../components/app-header/app-header'
import Orders from '../../components/orders/orders'
import Stats from '../../components/stats/stats'
import { useEffect } from 'react'
import { useDispatch } from '../../hooks'
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActionTypes'
import { ALL_ORDERS_URL } from '../../utils/wsUrls' 

export function FeedPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart(ALL_ORDERS_URL, ''))

        return () => {
            dispatch(wsConnectionClosed());
        }
    }, []) 

    return (
        <>
            <AppHeader/>
            <main className={feedStyles.content}>
                <h1 className='text text_type_main-large mt-10 mb-5 pl-5'>Лента заказов</h1>
                <section className={`${feedStyles.feed} pl-5 pr-5`}>
                        <div className={feedStyles.orderList}>
                            <Orders/>
                        </div>
                        <div className={feedStyles.wrapper}>
                            <Stats/>
                        </div>
                </section>
            </main>
        </>
    )
}