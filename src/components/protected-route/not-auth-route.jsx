import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const NotAuthRoute = ({ element }) => {
    const { isAuth} = useSelector((store) => store.user);

    return !isAuth ? element : <Navigate to='/' replace/>;   
}

NotAuthRoute.propTypes = {
    element: PropTypes.element.isRequired
}