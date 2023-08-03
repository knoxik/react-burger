import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from '../../../hooks';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const IngredientDetails = () => {
    const { ingredients } = useSelector(state => state.ingredients)
    const { id } = useParams();
    const ingredient = ingredients.find((ingredient) => ingredient._id === id)
    const location = useLocation();
    const background = location.state?.background

    return (
        <>
        {ingredient && (     
            <div className={`${ingredientDetailsStyles.container}`}>
                {!background && <h2 className={`text text_type_main-large mt-30`}>Детали ингредиента</h2>} 
                <div className={`${ingredientDetailsStyles.details}`}>
                    <img src={ingredient.image_large} alt={ingredient.name}/>
                    <p className={`text text_type_main-medium pt-4`}>{ingredient.name}</p>
                    <div className={`${ingredientDetailsStyles.nutrition} pt-8 pb-15`}>
                        <div className={`${ingredientDetailsStyles.nutritionValue}`}>
                            <p className={`${ingredientDetailsStyles.nutritionText} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                            <p className={`${ingredientDetailsStyles.nutritionNumber} text text_type_digits-default text_color_inactive`}>{ingredient.calories}</p>
                        </div>
                        <div className={`${ingredientDetailsStyles.nutritionValue}`}>
                            <p className={`${ingredientDetailsStyles.nutritionText} text text_type_main-default text_color_inactive`}>Белки, г</p>
                            <p className={`${ingredientDetailsStyles.nutritionNumber} text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</p>
                        </div>
                        <div className={`${ingredientDetailsStyles.nutritionValue}`}>
                            <p className={`${ingredientDetailsStyles.nutritionText} text text_type_main-default text_color_inactive`}>Жиры, г</p>
                            <p className={`${ingredientDetailsStyles.nutritionNumber} text text_type_digits-default text_color_inactive`}>{ingredient.fat}</p>
                        </div>
                        <div className={`${ingredientDetailsStyles.nutritionValue}`}>
                            <p className={`${ingredientDetailsStyles.nutritionText} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                                <p className={`${ingredientDetailsStyles.nutritionNumber} text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default IngredientDetails;