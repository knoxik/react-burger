import React, {UIEvent} from 'react';
import { useSelector } from '../../hooks';
import Tabs from './tabs/tabs';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { CardList } from './card/card';
import { INGREDIENT_TYPES } from '../../utils/ingredient-types';


const BurgerIngredients = () => {
    const { ingredientsRequest, ingredientsFailed, bunList, sauceList, mainList } = useSelector(state => state.ingredients);
    const [current, setCurrent] = React.useState(INGREDIENT_TYPES.BUN)

    const bunRef = React.useRef<HTMLHeadingElement>(null);
    const sauseRef = React.useRef<HTMLHeadingElement>(null);
    const mainRef = React.useRef<HTMLHeadingElement>(null);
    const ingredientsRef = React.useRef<HTMLDivElement>(null);


    const clickTabScroll = (ref: typeof bunRef, value: string) => {
        setCurrent(value)
        if (ref.current && ingredientsRef.current && bunRef.current) {
            const srctollToY = ref.current.getBoundingClientRect().y - bunRef.current?.getBoundingClientRect().y
            ingredientsRef.current.scrollTo({top: srctollToY, behavior: 'smooth'})
        }
        
    }

    const scrollSpy = (evt: UIEvent<HTMLDivElement>) => {
        const target = evt.target as HTMLElement
        const offsetY = -130;
        if (sauseRef.current && bunRef.current && mainRef.current) {
            const sauseY = sauseRef.current.getBoundingClientRect().y - bunRef.current.getBoundingClientRect().y + offsetY
            const mainY = mainRef.current.getBoundingClientRect().y - bunRef.current.getBoundingClientRect().y + offsetY
            const currentY = target.getBoundingClientRect().y - bunRef.current.getBoundingClientRect().y

            if (currentY < sauseY) {
                setCurrent(INGREDIENT_TYPES.BUN)
            } else if (currentY >= sauseY && currentY < mainY) {
                setCurrent(INGREDIENT_TYPES.SAUCE)
            } else if (currentY >= mainY) {
                setCurrent(INGREDIENT_TYPES.MAIN)
            }
        }
    }
    
    if (ingredientsFailed) {
        return <p>Произошла ошибка при получении данных</p>
    } else if (ingredientsRequest) {
        return <p>Загрузка...</p>
    } else {
        return (
            <>
            <Tabs scrollHandler={clickTabScroll} bunRef={bunRef} sauseRef={sauseRef} mainRef={mainRef} current={current}/>    
            <div className={`${burgerIngredientsStyles.ingredients} mt-10 mb-4`} onScroll={scrollSpy} ref={ingredientsRef}>
                <CardList ref={bunRef} headline='Булки' ingredientList={bunList}/>
                <CardList ref={sauseRef} headline='Соусы' ingredientList={sauceList}/>
                <CardList ref={mainRef} headline='Начинки' ingredientList={mainList}/>
            </div>
            </>
        )   
    }
}

export default BurgerIngredients;