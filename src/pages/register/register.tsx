import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import Registration from '../../components/registration/registration';
import AppHeader from '../../components/app-header/app-header';
import { LOGIN_ROUTE } from '../../utils/routes';
import { useDispatch, useSelector } from "../../hooks";
import { setUserFormValue } from '../../services/actions/register';
import { createUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';

export function RegisterPage() {
    const dispatch = useDispatch();
    const { registrationRequest, form } = useSelector((store) => store.registrationForm);
    const navigate = useNavigate();

    const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
        dispatch(setUserFormValue(evt.target.name, evt.target.value))
    }

    const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch(createUser(form, () => navigate('/', { replace: true })))
    }

    return (
        <>
        <AppHeader/>
        <Registration
            title='Регистрация'
            btn_name='Зарегистрироваться'
            additional_texts={[{'text': 'Уже зарегистрированы?', 'link': `/${LOGIN_ROUTE}`, 'link_text': 'Войти'}]}
            onFormSubmit={onFormSubmit}
            disabled={registrationRequest}
        >
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onFormChange}
                value={form.name}
                size={'default'}
                extraClass="mt-6"
                name='name'
            />
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