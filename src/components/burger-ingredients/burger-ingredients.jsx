import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { CurrencyIcon, Tab, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data'


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
        [current],
      );

    return (
        <div className={burgerIngredientsStyles.tabs}>
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

const CardList = ({id, headline, refProp, Ingredientlist}) => {
    return (
        <div>
            <h2 ref={refProp} className='text text_type_main-medium' id={id}>{headline}</h2>
            <div className={burgerIngredientsStyles.cardList}>
                {Ingredientlist.map((ingredient) => (
                    <Card key={ingredient._id} ingredient={ingredient}/>
                ))}
            </div>
        </div>
    )
}

const Card = ({ingredient}) => {
    return (
        <div className={burgerIngredientsStyles.card + ' mt-6 mb-10'}>
            {ingredient._id === '60666c42cc7b410027a1a9b1' && <Counter count={1} size='default' />}
            <img className={`${burgerIngredientsStyles.cardImage} pl-4 pr-4`} src={ingredient.image_large}></img>
            <div className={`${burgerIngredientsStyles.cardPrice} pt-1 pb-1`}>
                <p className='text text_type_digits-default'>{ingredient.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p className={`${burgerIngredientsStyles.cardName} text text_type_main-default`}>{ingredient.name}</p>
        </div>
    )
}

const BurgerIngredients = () => {
    const bunRef = React.useRef();
    const sauseRef = React.useRef();
    const mainRef = React.useRef();

    const executeScroll = (ref) => {
        ref.current.scrollIntoView({block: 'start', behavior: 'smooth'});
    }

    const bunList = data.filter(ingredient => ingredient.type === 'bun')
    const sauceList = data.filter(ingredient => ingredient.type === 'sauce')
    const mainList = data.filter(ingredient => ingredient.type === 'main')

    return (
        <>
        <Tabs scrollHandler={executeScroll} bunRef={bunRef} sauseRef={sauseRef} mainRef={mainRef}/>    
        <div className={`${burgerIngredientsStyles.ingredients} mt-10 mb-4`}>
            <CardList refProp={bunRef} headline='Булки' Ingredientlist={bunList}/>
            <CardList refProp={sauseRef} headline='Соусы' Ingredientlist={sauceList}/>
            <CardList refProp={mainRef} headline='Начинки' Ingredientlist={mainList}/>
        </div>
        </>
    )
}

export default BurgerIngredients;