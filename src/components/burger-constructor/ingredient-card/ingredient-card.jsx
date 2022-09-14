import IngredientCardStyles from './ingredient-card.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'


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

IngredientCard.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired
}

export default IngredientCard