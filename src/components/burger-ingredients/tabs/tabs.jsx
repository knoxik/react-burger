import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabsStyles from './tabs.module.css';
import PropTypes from 'prop-types';
import { refPropTypes } from '../../../utils/propTypes';
import { INGREDIENT_TYPES } from '../../../utils/ingredient-types';

const Tabs = ({scrollHandler, bunRef, sauseRef, mainRef, current}) => {
    const clickTabHandler = (value) => {
        switch (value) {
            case INGREDIENT_TYPES.BUN:
                memoizedscrollHandler(bunRef, value);
                break;
            case INGREDIENT_TYPES.SAUCE:
                memoizedscrollHandler(sauseRef, value);
                break;
            case INGREDIENT_TYPES.MAIN:
                memoizedscrollHandler(mainRef, value);
                break;
        }
    }
    
    const memoizedscrollHandler = React.useCallback(
        (ref, value) => {
            scrollHandler(ref, value);
        },
        [],
      );

    return (
        <div className={tabsStyles.tabs}>
            <Tab value={INGREDIENT_TYPES.BUN} active={current === INGREDIENT_TYPES.BUN} onClick={clickTabHandler}>
                Булки
            </Tab>
            <Tab value={INGREDIENT_TYPES.SAUCE} active={current === INGREDIENT_TYPES.SAUCE} onClick={clickTabHandler}>
                Соусы
            </Tab>
            <Tab value={INGREDIENT_TYPES.MAIN} active={current === INGREDIENT_TYPES.MAIN} onClick={clickTabHandler}>
                Начинки
            </Tab>
        </div>
    )
}

Tabs.propTypes = {
    scrollHandler: PropTypes.func.isRequired,
    bunRef: refPropTypes.isRequired,
    sauseRef: refPropTypes.isRequired,
    mainRef: refPropTypes.isRequired,
    current: PropTypes.string.isRequired,
};

export default Tabs;