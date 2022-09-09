import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const Navigation = props => {
    return (
        <ul className={headerStyles.menu}>
            {props.children}
        </ul>
    )
}

const LinkItem = props => {
    return (
        <li className={headerStyles.menuItem + ' pl-5 pr-5 pt-4 pb-4'}>
            <a className={headerStyles.link} href={props.href}>
                {props.icon}
                <p className={props.textClass + ' pl-2'}>{props.children}</p>
            </a>
        </li>
    )
};

class AppHeader extends React.Component {
    render() {
        return (
            <header className={headerStyles.header}>
                <div className={headerStyles.logo}>
                    <Logo />
                </div>
                <div className={headerStyles.wrapper}>
                    <Navigation>
                        <LinkItem textClass='text text_type_main-default'
                                  icon={<BurgerIcon />}
                                  href='#'>
                                        Конструктор
                        </LinkItem>
                        <LinkItem textClass='text text_type_main-default text_color_inactive'
                                  icon={<ListIcon type="secondary" />}
                                  href='#'>
                                        Лента заказов
                        </LinkItem>
                    </Navigation>

                    <Navigation>
                        <LinkItem textClass='text text_type_main-default text_color_inactive'
                                  icon={<ProfileIcon type="secondary" />}
                                  href='#'>
                                        Личный кабинет
                        </LinkItem>
                    </Navigation>    
                </div>
            </header>
        )
    }
}

export default AppHeader;