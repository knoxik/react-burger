import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/propTypes';
import mainStyles from './app-main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'


const AppMain = ({ ingredientList }) => {
    return (
        <main className={mainStyles.content}>
            <h1 className='text text_type_main-large mt-10 mb-5 pl-5'>Соберите бургер</h1>
            <section className={`${mainStyles.burger} pl-5 pr-5`}>
                <div className={mainStyles.wrapper}>
                    <BurgerIngredients ingredientList={ingredientList}/>
                </div>
                <div className={mainStyles.wrapper}>
                    <BurgerConstructor ingredientList={ingredientList}/>
                </div>
            </section>
        </main>
    )   
}

AppMain.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
};

export default AppMain;