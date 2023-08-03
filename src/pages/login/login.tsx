import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import Registration from '../../components/registration/registration';
import AppHeader from '../../components/app-header/app-header';
import { REGISTER_ROUTE, FORGOT_PASSWORD_ROUTE } from '../../utils/routes';
import { useDispatch, useSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { setUserFormValue } from '../../services/actions/login-form';
import { authUser } from '../../utils/api';
import { ChangeEvent, FormEvent } from 'react';

export function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loginRequest, form } = useSelector((store) => store.loginForm);

    const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserFormValue(evt.target.name, evt.target.value))
    }

    const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch(authUser(form, () => navigate('/', { replace: true })))
    }

    return (
        <>
        <AppHeader/>
        <Registration
            title='Вход'
            btn_name='Войти'
            additional_texts={[{'text': 'Вы — новый пользователь?', 'link': `/${REGISTER_ROUTE}`, 'link_text': 'Зарегистрироваться'},
                               {'text': 'Забыли пароль?', 'link': `/${FORGOT_PASSWORD_ROUTE}`, 'link_text': 'Восстановить пароль'}]}
            onFormSubmit={onFormSubmit}
            disabled={loginRequest}
        >
            <EmailInput 
                placeholder={'E-mail'}
                onChange={onFormChange} 
                value={form.email}
                size={'default'}
                extraClass="mt-6"
                name='email'
            />
            <PasswordInput 
                placeholder={'Пароль'} 
                onChange={onFormChange} 
                value={form.password}
                size={'default'}
                icon={'ShowIcon'}
                extraClass="mt-6"
                className='text input__textfield text_type_main-default pr-6'
                name='password'
            />
        </Registration>
        </>
    );
  }