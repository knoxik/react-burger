import headerStyles from './app-header.module.css';
import LinkItem from './link-item/link-item'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { PROFILE_ROUTE, FEED_ROUTE } from '../../utils/routes';

const AppHeader = () =>  {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.logo}>
                <Logo />
            </div>
            <nav className={headerStyles.wrapper}>
                <ul className={headerStyles.menu}>
                    <LinkItem textClass='text text_type_main-default'
                            iconName='BurgerIcon'
                            href='/'>
                                    Конструктор
                    </LinkItem>
                    <LinkItem textClass='text text_type_main-default'
                            iconName='ListIcon'
                            href={`/${FEED_ROUTE}`}>
                                    Лента заказов
                    </LinkItem>
                </ul>
                <ul className={headerStyles.menu}>
                    <LinkItem textClass='text text_type_main-default'
                            iconName='ProfileIcon'
                            href={`/${PROFILE_ROUTE}`}>
                                    Личный кабинет
                    </LinkItem>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;