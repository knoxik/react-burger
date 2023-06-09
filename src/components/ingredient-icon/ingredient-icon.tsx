import iconStyles from './ingredient-icon.module.css';
import cn from 'classnames';
import { FC } from 'react';

type Props = {
    name: string;
    image: string;
    extraClass?: string;
    counter?: number;
    zIndex?: number;
    opacity?: string;
}

const IngredientIcon: FC<Props> = ({name, image, extraClass, counter, zIndex, opacity}) => {
    return (
        <div className={cn(iconStyles.imageWrapper, extraClass)} style={{zIndex: zIndex}}>
            <img 
                className={iconStyles.ingredientsImage}
                style={{opacity: opacity}}
                src={image}
                alt={name}
            />
            {counter && (
                <p className={`${iconStyles.count} text text_type_main-default`}>+{counter}</p>
            )}
        </div>
    )
}

export default IngredientIcon;