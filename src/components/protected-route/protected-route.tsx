import { useSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/routes';
import { FC } from 'react';

type Props = {
    element: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({ element }) => {
    const { isAuth, user, userRequest } = useSelector((store) => store.user);

    return isAuth ? element : <Navigate to={`/${LOGIN_ROUTE}`} replace/>;   
}