import linkItemStyles from './link-item.module.css';
import propTypes from 'prop-types'

const LinkItem = ({href, icon, children, textClass}) => {
    return (
        <li className={`${linkItemStyles.menuItem} pl-5 pr-5 pt-4 pb-4`}>
            <a className={linkItemStyles.link} href={href}>
                {icon}
                <p className={`${textClass} pl-2`}>{children}</p>
            </a>
        </li>
    )
};

LinkItem.propTypes = {
    href: propTypes.string.isRequired,
    icon: propTypes.element.isRequired,
    children: propTypes.elementType.isRequired,
    textClass: propTypes.string.isRequired
}

export default LinkItem