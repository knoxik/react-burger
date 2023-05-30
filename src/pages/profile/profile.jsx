import profileStyles from './profile.module.css';
import { Input, Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from '../../components/app-header/app-header';
import React from 'react';
import { PROFILE_ROUTE, ORDERS_ROUTE, LOGIN_ROUTE } from '../../utils/routes';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFormValue } from '../../services/actions/profile-info';
import { updateUserData, deleteUserData } from '../../utils/api';
import { clx } from '../../utils/utils';

export function ProfilePage() {
    const dispatch = useDispatch();
    const { form } = useSelector((store) => store.updateUserForm);
    const { user } = useSelector((store) => store.user);
    const [resetBtnDisabled, setResetBtnDisabled] = React.useState(true);
    const [saveBtnDisabled, setSaveBtnDisabled] = React.useState(true);
    const location = useLocation();

    const logOut = () => {
        dispatch(deleteUserData())
    }

    const setInitialForm = () => {
        dispatch(setFormValue('name', user.name));
        dispatch(setFormValue('email', user.email));
        dispatch(setFormValue('password', null));
    }
   
    React.useEffect(() => {
        setInitialForm();
    }, [user])

    React.useEffect(() => {
        checkButtonDisabled();
    }, [form])

    const onFormChange = (evt) => {
        const field = evt.target.name;
        const value = evt.target.value
        
        if (field === 'password' && value === '') {
            dispatch(setFormValue(field, null))
        } else {
            dispatch(setFormValue(field, value))
        }
    }

    const onFormReset = () => {
        setInitialForm();
        setSaveBtnDisabled(true);
        setResetBtnDisabled(true);
    }

    const checkButtonDisabled = () => {
        if (form.email === '' || form.name === '') {
            setResetBtnDisabled(false);
            setSaveBtnDisabled(true);
        } else if (form.email === user.email && form.name === user.name && form.password === null) {
            setResetBtnDisabled(true);
            setSaveBtnDisabled(true);
        } else {
            setResetBtnDisabled(false);
            setSaveBtnDisabled(false);
        }
    }

    const onFormSubmit = (evt) => {
        setSaveBtnDisabled(true);
        setResetBtnDisabled(true);
        evt.preventDefault();
        dispatch(updateUserData(form))
    }

    const activeLinkStyle = `${profileStyles.link_active} text text_type_main-medium`;
    const linkStyle = `${profileStyles.link} text text_type_main-medium text_color_inactive`;

    return (
        <>
            <AppHeader/>
            <main className={profileStyles.profile}>
                <nav className='mr-15 mt-30'>
                    <ul className={profileStyles.links}>
                        <li className={profileStyles.linkItem}>
                            <NavLink to={`/${PROFILE_ROUTE}`}
                                className={clx({
                                    [activeLinkStyle]: location.pathname === `/${PROFILE_ROUTE}`,
                                    [linkStyle] : true,
                                })}> 
                                        Профиль
                            </NavLink>
                        </li>
                        <li className={profileStyles.linkItem}>
                            <NavLink to={`/${PROFILE_ROUTE}/${ORDERS_ROUTE}`} 
                                className={clx({
                                    [activeLinkStyle]: location.pathname === `/${PROFILE_ROUTE}/${ORDERS_ROUTE}`,
                                    [linkStyle] : true,
                                })}> 
                                        История заказов
                            </NavLink>
                        </li>
                        <li className={profileStyles.linkItem}>
                            <NavLink to={`/`} 
                                onClick={logOut}
                                className={linkStyle}> 
                                    Выход
                            </NavLink>
                        </li> 
                        <p className={`${profileStyles.caption} text text_type_main-default text_color_inactive mt-20`}>
                            В этом разделе вы можете изменить свои персональные данные
                        </p>  
                    </ul>
                </nav>
                {location.pathname === `/${PROFILE_ROUTE}/${ORDERS_ROUTE}` ? (
                    <Outlet/>
                ) : (
                <div className='mt-30'>
                    <form className={profileStyles.form} onSubmit={onFormSubmit}>
                        <Input
                            type='text'
                            onChange={onFormChange}
                            value={form.name}
                            name={'name'}
                            placeholder='Имя'
                            extraClass={"mb-6"}
                        />       
                        <EmailInput
                            onChange={onFormChange}
                            value={form.email}
                            name={'email'}
                            placeholder='Логин'
                            extraClass="mb-6"
                        />
                        <PasswordInput
                            onChange={onFormChange}
                            value={form?.password || ''}
                            name={'password'}
                            extraClass="mb-6"
                            placeholder='Новый пароль'
                        />
                        <Button onClick={onFormReset} htmlType="button" type="primary" size="medium" extraClass="mt-6" disabled={resetBtnDisabled}>
                            Отмена
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-4" disabled={saveBtnDisabled}>
                            Сохранить
                        </Button>
                    </form>                   
                </div>
                )}   
            </main>
        </>
    );
  }