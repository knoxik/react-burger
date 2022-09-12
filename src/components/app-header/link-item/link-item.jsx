import linkItemStyles from './link-item.module.css';

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

export default LinkItem