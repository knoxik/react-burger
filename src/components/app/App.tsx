import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import { ProtectedRoute } from '../protected-route/protected-route';
import { NotAuthRoute } from '../protected-route/not-auth-route';
import { getUserData, getIngredientsData } from '../../utils/api';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookie';
import { useLocation } from 'react-router-dom';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import { DELETE_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import Modal from '../modal/modal';
import { 
  HomePage, 
  LoginPage, 
  RegisterPage, 
  ForgotPasswordPage, 
  ResetPasswordPage,
  ProfilePage,
  OrdersHistoryPage,
  IngredientDetailsPage,
  FeedPage,
  OrderInfoPage
} from '../../pages';
import { 
  LOGIN_ROUTE, 
  REGISTER_ROUTE, 
  FORGOT_PASSWORD_ROUTE, 
  RESET_PASSWORD_ROUTE,
  PROFILE_ROUTE,
  ORDERS_ROUTE,
  INGREDIENT_DETAILS_ROUTE,
  FEED_ROUTE
} from '../../utils/routes';
import { ADD_BUN, INCREMENT_PRICE } from '../../services/actions/burger-constructor';
import OrderInfo from '../order-info/order-info';

const App = () => {
    const { userRequest } = useSelector((store) => store.user);
    const { ingredientsRequest, bunList } = useSelector(state => state.ingredients);
    const { constructorIngredients } = useSelector(state => state.constructorIngredients);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const background = location.state?.background;

    useEffect(() => {   
        dispatch(getIngredientsData())  
        dispatch(getUserData())
    }, [dispatch])

    useEffect(() => {
      if (constructorIngredients.length == 0 && bunList.length != 0) {
          dispatch({
              type: ADD_BUN,
              bun: bunList[0]
          })
          dispatch({
              type: INCREMENT_PRICE,
              price: bunList[0].price * 2
          })
      }
    }, [bunList])

    const closeModal = () => {
        dispatch({
            type: DELETE_INGREDIENT_DETAILS
        })
        navigate(-1)
    }

    if ((userRequest && getCookie('refreshToken')) || ingredientsRequest) {
        return <p>Загрузка...</p>
    }

    return (
      <>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path={LOGIN_ROUTE} element={<NotAuthRoute element={<LoginPage/>}/>} />
        <Route path={REGISTER_ROUTE} element={<NotAuthRoute element={<RegisterPage/>}/>} />
        <Route path={FORGOT_PASSWORD_ROUTE} element={<NotAuthRoute element={<ForgotPasswordPage/>}/>} />
        <Route path={RESET_PASSWORD_ROUTE} element={<NotAuthRoute element={<ResetPasswordPage/>}/>} />
        <Route path={PROFILE_ROUTE} element={<ProtectedRoute element={<ProfilePage />}/>} >
          <Route path={ORDERS_ROUTE} element={<ProtectedRoute element={<OrdersHistoryPage/>}/>}/>
        </Route>
        <Route path={INGREDIENT_DETAILS_ROUTE} element={<IngredientDetailsPage />} />
        <Route path={FEED_ROUTE} element={<FeedPage />} />
        <Route path={`${FEED_ROUTE}/:id`} element={<OrderInfoPage />} />
        <Route path={`${PROFILE_ROUTE}/${ORDERS_ROUTE}/:id`} element={<ProtectedRoute element={<OrderInfoPage/>}/>}/>
        
      </Routes>

      {background && (
        <Routes>
          <Route path={INGREDIENT_DETAILS_ROUTE}
                 element={
                  <Modal title='Детали ингредиента' onClose={closeModal}>
                      <IngredientDetails/>
                  </Modal>
                }/>
          <Route path={`${FEED_ROUTE}/:id`}
                 element={
                  <Modal title={`#${location.state.number}`} titleClass='text text_type_digits-default' onClose={closeModal}>
                      <OrderInfo isModal={true}/>
                  </Modal>
                }/>
          <Route path={`${PROFILE_ROUTE}/${ORDERS_ROUTE}/:id`}
                 element={
                  <Modal title={`#${location.state.number}`} titleClass='text text_type_digits-default' onClose={closeModal}>
                      <OrderInfo isModal={true}/>
                  </Modal>
                }/>
        </Routes>
      )}
      </>
    );
  }

export default App;
