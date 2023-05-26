import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/routes';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ element }) => {
    const { isAuth, user, userRequest } = useSelector((store) => store.user);

    return isAuth ? element : <Navigate to={`/${LOGIN_ROUTE}`} replace/>;   
}

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired
}