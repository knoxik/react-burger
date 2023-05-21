import registrationStyles from './registration.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registrationTextsPropTypes } from '../../utils/propTypes';

const Registration = ({title, btn_name, additional_texts, children, onFormSubmit, disabled}) =>  {
    
    return (
        <main className={registrationStyles.content}>
            <h1 className="text text_type_main-medium">{title}</h1>
            <form className={registrationStyles.form} onSubmit={onFormSubmit}>
                {children}
                <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20" disabled={disabled}>
                    {btn_name}
                </Button>
            </form>
            {additional_texts.map(({text, link, link_text, id}, index) => (
                <p key={index} className={`text text_type_main-default text_color_inactive ${index >= 1 ? 'mt-4' : ''}`}>
                    {text}
                    <Link to={link}
                        className={`text text_type_main-default ${registrationStyles.link}`}>
                            &nbsp;{link_text}
                    </Link>
                </p>
            ))}            
        </main>
    )
}

Registration.propTypes = {
    title: PropTypes.string.isRequired,
    btn_name: PropTypes.string.isRequired,
    additional_texts: PropTypes.arrayOf(registrationTextsPropTypes.isRequired).isRequired,
    children: PropTypes.any.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}

export default Registration;