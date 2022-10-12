import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from './tabs/tabs';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { CardList } from './card/card';
import { getIngredientsData } from '../../utils/api'


const BurgerIngredients = () => {
    const { ingredientsRequest, ingredientsFailed, bunList, sauceList, mainList } = useSelector(state => state.ingredients);

    const [current, setCurrent] = React.useState(0)

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getIngredientsData()) 
    }, [])

    const bunRef = React.useRef();
    const sauseRef = React.useRef();
    const mainRef = React.useRef();
    const ingredientsRef = React.useRef();

    const clickTabScroll = (ref) => {
        const srctollToY = ref.current.getBoundingClientRect().y - bunRef.current.getBoundingClientRect().y
        ingredientsRef.current.scrollTo({top: srctollToY, behavior: 'smooth'})
    }

    const scrollSpy = (evt) => {
        const target = evt.target
        const offsetY = -130;
        const sauseY = sauseRef.current.getBoundingClientRect().y - bunRef.current.getBoundingClientRect().y + offsetY
        const mainY = mainRef.current.getBoundingClientRect().y - bunRef.current.getBoundingClientRect().y + offsetY
        const currentY = target.getBoundingClientRect().y - bunRef.current.getBoundingClientRect().y

        if (currentY < sauseY) {
            setCurrent(0)
        } else if (currentY >= sauseY && currentY < mainY) {
            setCurrent(1)
        } else if (currentY >= mainY) {
            setCurrent(2)
        }
    }
    
    if (ingredientsFailed) {
        return <p>Произошла ошибка при получении данных</p>
    } else if (ingredientsRequest) {
        return <p>Загрузка...</p>
    } else {
        return (
            <>
            <Tabs scrollHandler={clickTabScroll} bunRef={bunRef} sauseRef={sauseRef} mainRef={mainRef} state={[current, setCurrent]}/>    
            <div className={`${burgerIngredientsStyles.ingredients} mt-10 mb-4`} onScroll={scrollSpy} ref={ingredientsRef}>
                <CardList refProp={bunRef} headline='Булки' ingredientList={bunList}/>
                <CardList refProp={sauseRef} headline='Соусы' ingredientList={sauceList}/>
                <CardList refProp={mainRef} headline='Начинки' ingredientList={mainList}/>
            </div>
            </>
        )   
    }
}

export default BurgerIngredients;