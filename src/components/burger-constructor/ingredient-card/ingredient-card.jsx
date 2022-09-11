import IngredientCardStyles from './ingredient-card.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const IngredientCard = ({text, price, img}) => {
    return (
        <div className={IngredientCardStyles.card}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={text}
                price={price}
                thumbnail={img}
            />
        </div>
    )
}

export default IngredientCard