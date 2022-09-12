import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import cardStyles from './card.module.css';

export const CardList = ({id, headline, refProp, Ingredientlist}) => {
    return (
        <div>
            <h2 ref={refProp} className='text text_type_main-medium' id={id}>{headline}</h2>
            <div className={cardStyles.cardList}>
                {Ingredientlist.map((ingredient) => (
                    <Card key={ingredient._id} ingredient={ingredient}/>
                ))}
            </div>
        </div>
    )
}

const Card = ({ingredient}) => {
    return (
        <div className={cardStyles.card + ' mt-6 mb-10'}>
            {ingredient._id === '60666c42cc7b410027a1a9b1' && <Counter count={1} size='default' />}
            <img className={`${cardStyles.cardImage} pl-4 pr-4`} src={ingredient.image_large}></img>
            <div className={`${cardStyles.cardPrice} pt-1 pb-1`}>
                <p className='text text_type_digits-default'>{ingredient.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p className={`${cardStyles.cardName} text text_type_main-default`}>{ingredient.name}</p>
        </div>
    )
}