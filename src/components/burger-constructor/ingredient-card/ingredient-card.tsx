import React, {FC} from 'react'
import IngredientCardStyles from './ingredient-card.module.css';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { DELETE_INGREDIENT, DECREMENT_PRICE } from '../../../services/actions/burger-constructor';
import { useDispatch } from '../../../hooks';

// IngredientCard.propTypes = {
//   text: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   img: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
//   moveCard: PropTypes.func.isRequired,
//   uniq_id: PropTypes.string.isRequired,
// }

type Props = {
  text: string;
  price: number;
  img: string;
  id: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  uniq_id: string;
}

type TItem = {
  id: string;
  index: number;
  uniq_id: string;
}

const IngredientCard: FC<Props> = ({text, price, img, id, index, moveCard, uniq_id}) => {
    const ref = React.useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const [{ handlerId }, drop] = useDrop({
        accept: 'ingredientConstructor',
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item: any, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.index
          const hoverIndex = index

          if (dragIndex === hoverIndex) {
            return
          }

          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()
          if (clientOffset?.y) {
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return
            }
          }

          moveCard(dragIndex, hoverIndex)
          item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'ingredientConstructor',
        item: () => {
          return { id, index, uniq_id };
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))

    const handleDelete = () => {
        dispatch({
            type: DELETE_INGREDIENT,
            uniq_id: uniq_id
        })
        dispatch({
            type: DECREMENT_PRICE,
            price: price
        })
    }

    return (
        <div className={IngredientCardStyles.card} ref={ref} data-handler-id={handlerId}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={text}
                price={price}
                thumbnail={img}
                handleClose={handleDelete}
            />
        </div>
    )
}

export default IngredientCard