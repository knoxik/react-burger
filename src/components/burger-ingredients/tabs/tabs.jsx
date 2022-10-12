import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabsStyles from './tabs.module.css';
import PropTypes from 'prop-types';

const Tabs = ({scrollHandler, bunRef, sauseRef, mainRef, state}) => {
    const [current, setCurrent] = state

    const clickTabHandler = (evt) => {
        switch (evt) {
            case 0:
                memoizedscrollHandler(bunRef, evt);
                break;
            case 1:
                memoizedscrollHandler(sauseRef, evt);
                break;
            case 2:
                memoizedscrollHandler(mainRef, evt);
                break;
        }
    }
    
    const memoizedscrollHandler = React.useCallback(
        (ref, current) => {
            setCurrent(current);
            scrollHandler(ref);
        },
        [],
      );

    return (
        <div className={tabsStyles.tabs}>
            <Tab value={0} active={current === 0 } onClick={clickTabHandler}>
                Булки
            </Tab>
            <Tab value={1} active={current === 1} onClick={clickTabHandler}>
                Соусы
            </Tab>
            <Tab value={2} active={current === 2} onClick={clickTabHandler}>
                Начинки
            </Tab>
        </div>
    )
}

Tabs.propTypes = {
    scrollHandler: PropTypes.func.isRequired,
    bunRef: PropTypes.object.isRequired, 
    sauseRef: PropTypes.object.isRequired,
    mainRef: PropTypes.object.isRequired,
    state: PropTypes.array.isRequired,
};

export default Tabs;