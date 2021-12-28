import './TaskTypesCard.css'
import { NavLink } from 'react-router-dom';

const TaskTypesCard = ({id,name,image,price}) => {

    if (image) {
        return (
            <div className="taskTypeCard">
                <NavLink to={`/task-new/${id}`}>
                    <div className='task_type_card_div'>
                        <img className= 'taskTypeImage' src={image} alt="TaskTypePic"/>
                        <span className='taskTypeName'>{name}</span>
                        <span className='taskTypePrice'>Avg Price ${price}</span>
                    </div>
                </NavLink>
            </div>
            );
        }
    return null
};

export default TaskTypesCard;
