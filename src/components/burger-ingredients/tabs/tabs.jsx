import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabsStyles from './tabs.module.css';
import PropTypes from 'prop-types';

const Tabs = ({scrollHandler, bunRef, sauseRef, mainRef}) => {
    const [current, setCurrent] = React.useState(null)

    React.useEffect(() => {
        switch (current) {
            case 'one':
                memoizedscrollHandler(bunRef);
                break;
            case 'two':
                memoizedscrollHandler(sauseRef);
                break;
            case 'three':
                memoizedscrollHandler(mainRef);
                break;
        }
    }, [current])

    const memoizedscrollHandler = React.useCallback(
        (ref) => {
            scrollHandler(ref);
        },
        [],
      );

    return (
        <div className={tabsStyles.tabs}>
            <Tab value='one' active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value='two' active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value='three' active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

Tabs.propTypes = {
    scrollHandler: PropTypes.func.isRequired,
    bunRef: PropTypes.object.isRequired, 
    sauseRef: PropTypes.object.isRequired,
    mainRef: PropTypes.object.isRequired
};

export default Tabs;