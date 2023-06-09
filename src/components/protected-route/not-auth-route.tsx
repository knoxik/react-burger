import { useSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { FC } from 'react';

type Props = {
    element: JSX.Element
}

export const NotAuthRoute: FC<Props> = ({ element }) => {
    const { isAuth} = useSelector((store) => store.user);

    return !isAuth ? element : <Navigate to='/' replace/>;   
}
