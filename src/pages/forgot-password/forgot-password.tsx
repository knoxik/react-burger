import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import Registration from '../../components/registration/registration';
import AppHeader from '../../components/app-header/app-header';
import { LOGIN_ROUTE } from '../../utils/routes';
import { useDispatch, useSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { setFormValue } from '../../services/actions/forgot-password';
import { forgotPassword } from '../../utils/api';
import { RESET_PASSWORD_ROUTE } from '../../utils/routes';
import { ChangeEvent, FormEvent } from 'react';

export function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { forgotPasswordRequest, form } = useSelector((store) => store.forgotPasswordForm);

    const onFormChange = (evt: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormValue(evt.target.name, evt.target.value))
    }

    const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        dispatch(forgotPassword(form, () => navigate(`/${RESET_PASSWORD_ROUTE}`, { state: {codeSent: true} })))
    }

    return (
        <>
        <AppHeader/>
        <Registration
            title='Восстановление пароля'
            btn_name='Восстановить'
            additional_texts={[{'text': 'Вспомнили пароль?', 'link': `/${LOGIN_ROUTE}`, 'link_text': 'Войти'}]}
            onFormSubmit={onFormSubmit}
            disabled={forgotPasswordRequest}
        >
            <EmailInput 
                placeholder={'Укажите e-mail'}
                onChange={onFormChange} 
                value={form.email}
                size={'default'}
                extraClass="mt-6"
                name='email'
            />
        </Registration>
        </>
    );
  }