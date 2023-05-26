import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import Registration from '../../components/registration/registration';
import AppHeader from '../../components/app-header/app-header';
import React from 'react';
import { LOGIN_ROUTE, FORGOT_PASSWORD_ROUTE } from '../../utils/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../utils/api';
import { setFormValue } from '../../services/actions/reset-password';

export function ResetPasswordPage() {
    const { resetPasswordRequest, form } = useSelector((store) => store.resetPasswordForm);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!location.state?.codeSent) {
            navigate(`/${FORGOT_PASSWORD_ROUTE}`, { replace: true })
        }
    }, [])


    const onFormChange = (evt) => {
        dispatch(setFormValue(evt.target.name, evt.target.value))
    }

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        dispatch(resetPassword(form, () => navigate(`/${LOGIN_ROUTE}`, { replace: true })))
    }

    return (
        <>
        <AppHeader/>
        <Registration
            title='Восстановление пароля'
            btn_name='Сохранить'
            additional_texts={[{'text': 'Вспомнили пароль?', 'link': `/${LOGIN_ROUTE}`, 'link_text': 'Войти'}]}
            onFormSubmit={onFormSubmit}
            disabled={resetPasswordRequest}
        >
            <PasswordInput 
                placeholder={'Введите новый пароль'} 
                onChange={onFormChange} 
                value={form.password}
                size={'default'}
                icon={'ShowIcon'}
                extraClass="mt-6"
                className='text input__textfield text_type_main-default pr-6'
                name='password'
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={onFormChange}
                value={form.code}
                size={'default'}
                extraClass="mt-6"
                name='code'
            />
        </Registration>
        </>
    );
  }