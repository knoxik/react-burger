import React, {FC, RefObject} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabsStyles from './tabs.module.css';
import { INGREDIENT_TYPES } from '../../../utils/ingredient-types';

type Props = {
    bunRef: RefObject<HTMLHeadingElement>;
    sauseRef: RefObject<HTMLHeadingElement>;
    mainRef: RefObject<HTMLHeadingElement>;
    scrollHandler: (ref: RefObject<HTMLHeadingElement>, value: string) => void;
    current: string;
}

const Tabs: FC<Props> = ({scrollHandler, bunRef, sauseRef, mainRef, current}) => {
    const clickTabHandler = (value: string) => {
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
        (ref: RefObject<HTMLHeadingElement>, value: string) => {
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

export default Tabs;