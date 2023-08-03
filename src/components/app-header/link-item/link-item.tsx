import linkItemStyles from './link-item.module.css';
import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type Props = {
    href: string;
    iconName: string;
    textClass: string;
    children: ReactNode;
};

const LinkItem:FC<Props> = ({href, children, textClass, iconName}) => {
    const getIcon = (iconName: string, isActive: boolean) => {
        const type = isActive ? 'primary' : 'secondary';
        switch(iconName) {
            case 'BurgerIcon':
                return <BurgerIcon type={type}/>
            case 'ProfileIcon':
                return <ProfileIcon type={type}/>
            case 'ListIcon':
                return <ListIcon type={type}/>
        } 
    }

    return (
        <li className={`${linkItemStyles.menuItem} pl-5 pr-5 pt-4 pb-4`}>
            <NavLink to={href} className={({isActive}) => (isActive ? `${linkItemStyles.link_active}` : `${linkItemStyles.link} text_color_inactive`)}>
                {({isActive}) => (
                    <>
                    {getIcon(iconName, isActive)}
                    <p className={`${textClass} pl-2`}>{children}</p>
                    </>
                )}
            </NavLink>
        </li>
    )
};


export default LinkItem