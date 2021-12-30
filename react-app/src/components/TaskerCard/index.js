import './TaskerCard.css'

const TaskerCard = ({name,image,description,price,experience}) => {
    return (
        <div className='tasker_filter'>
            <div className='userImage_div'>
                <div>
                    <img className='userImage' src={image} alt="ProfilePic" />
                </div>
                <span>You can email your Tasker or adjust task details after booking.</span>
            </div>
            <div className='userDetails_div'>
                <div>
                    <strong>Name: </strong>
                    <span>{name}</span>
                </div>
                <div>
                    <strong>How I can help: </strong>
                    <span>{description}</span>
                </div>
                <div>
                    <strong>Price </strong>(per hour)<strong>:</strong>
                    <span>{price}$</span>
                </div>
                <div>
                    <strong>Experience </strong>(in years)<strong>:</strong>
                    <span>{experience}</span>
                </div>
            </div>
        </div>
    )
}

export default TaskerCard
