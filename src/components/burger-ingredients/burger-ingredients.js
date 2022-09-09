import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { CurrencyIcon, Tab, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data'


const Tabs = (props) => {
    const [current, setCurrent] = React.useState(null)

    React.useEffect(() => {
        if (current) props.scrollHandler(current)
    }, [current])

    return (
        <div style={{ display: 'flex'}}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

const CardList = (props) => {
    return (
        <div>
            <h2 ref={props.refProp} className='text text_type_main-medium' id={props.id}>{props.headline}</h2>
            <div className={burgerIngredientsStyles.cardList}>
                {props.list.map((ingredient, index) => (
                    <Card key={index} ingredient={ingredient}/>
                ))}
            </div>
        </div>
    )
}

const Card = ({key, ingredient}) => {
    return (
        <div className={burgerIngredientsStyles.card + ' mt-6 mb-10'}>
            {ingredient._id === '60666c42cc7b410027a1a9b1' && <Counter count={1} size='default' />}
            <img className={burgerIngredientsStyles.cardImage + ' pl-4 pr-4'} src={ingredient.image_large}></img>
            <div className={burgerIngredientsStyles.cardPrice + ' pt-1 pb-1'}>
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={burgerIngredientsStyles.cardName + ' text text_type_main-default'}>{ingredient.name}</p>
        </div>
    )
}

const BurgerIngredients = () => {
    const bunRef = React.useRef();
    const sauseRef = React.useRef();
    const mainRef = React.useRef();

    const executeScroll = (type) => {
        if (type === 'one') bunRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
        if (type === 'two') sauseRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
        if (type === 'three') mainRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
    }

    return (
        <>
        <Tabs scrollHandler={executeScroll}/>    
        <div className={burgerIngredientsStyles.ingredients + ' mt-10 mb-4'}>
            <CardList refProp={bunRef} headline='Булки' list={data.filter(ingredient => ingredient.type === 'bun')}/>
            <CardList refProp={sauseRef} headline='Соусы' list={data.filter(ingredient => ingredient.type === 'sauce')}/>
            <CardList refProp={mainRef} headline='Начинки' list={data.filter(ingredient => ingredient.type === 'main')}/>
        </div>
        </>
    )
}

export default BurgerIngredients;