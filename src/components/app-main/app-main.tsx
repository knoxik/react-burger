import mainStyles from './app-main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const AppMain = () => {
        return (
            <main className={mainStyles.content}>
                <h1 className='text text_type_main-large mt-10 mb-5 pl-5'>Соберите бургер</h1>
                <DndProvider backend={HTML5Backend}>
                    <section className={`${mainStyles.burger} pl-5 pr-5`}>
                        <div className={mainStyles.wrapper}>
                            <BurgerIngredients/>
                        </div>
                        <div className={mainStyles.wrapper}>
                            <BurgerConstructor/>
                        </div>
                    </section>
                </DndProvider>
            </main>
        )   
    }

export default AppMain;