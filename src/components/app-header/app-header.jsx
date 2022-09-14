import headerStyles from './app-header.module.css';
import LinkItem from './link-item/link-item'
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const AppHeader = () =>  {
    return (
        <header className={headerStyles.header}>
            <div className={headerStyles.logo}>
                <Logo />
            </div>
            <nav className={headerStyles.wrapper}>
                <ul className={headerStyles.menu}>
                    <LinkItem textClass='text text_type_main-default'
                            icon={<BurgerIcon />}
                            href='#'>
                                    Конструктор
                    </LinkItem>
                    <LinkItem textClass='text text_type_main-default text_color_inactive'
                            icon={<ListIcon type='secondary' />}
                            href='#'>
                                    Лента заказов
                    </LinkItem>
                </ul>
                <ul className={headerStyles.menu}>
                    <LinkItem textClass='text text_type_main-default text_color_inactive'
                            icon={<ProfileIcon type='secondary' />}
                            href='#'>
                                    Личный кабинет
                    </LinkItem>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;