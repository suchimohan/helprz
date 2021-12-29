# Helprz

[Helprz](https://helprz.herokuapp.com/) Useful site to find help for your household tasks limited to a certain location.

## Helprz App Screenshots

Search or Select tasks on the home page
![homepage](https://res.cloudinary.com/dpdawijui/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1640815602/screencapture-helprz-herokuapp-2021-12-29-13_43_11_mbjsep.png)

Tasker Profile Page
![taskerpage](https://res.cloudinary.com/dpdawijui/image/upload/t_media_lib_thumb/v1640816092/screencapture-helprz-herokuapp-users-5-taskers-35-2021-12-29-14_11_06_xufeu4.png)

Mytasks Page
![mytasks](https://res.cloudinary.com/dpdawijui/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1640815740/screencapture-localhost-3000-users-1-tasks-2021-12-29-14_02_48_cyjv15.png)

## Summary of the main features

Helprz includes MVP functionality for the following features:
- Choose a task
	- Users can search or select the task of their choice from available options
- Provide task details
	- Users can provide elaborate details on tasks
    - Users can select city, date and time for the task.
- Select tasker price & confirm
    -   Based on the city choosen Users can see the available   taskers and their profile
	- Users can select a tasker and confirm the booking
	- Users can view, edit or cancel the booking.
- Become a Tasker
	- Users can become a tasker
	- Users can edit their tasker profile and delete
	- Users can view their jobs and cancel.

## Documentation (see wiki)
Detailed documentation with the database schema, back-end routes, front-end routes, user stories, and features overview can be found in the [wiki](https://github.com/suchimohan/helprz/wiki)

## Tech details

The app is a combination of a Python back-end, wrapped over a relational database, and a React front-end.

- Database
	- **PostgresQL** as the main (and only) data store
	- **SQLAlchemy** for object mapping
	- **Alembic** for easy migration management
- Back-end API (Python)
	- **Flask** with assorted libraries such as **WTForms**
	- Served with **gunicorn** from a **Docker** container
- Front-end client (JavaScript)
	- UI is written in **React** using functional components
	- **Redux** state management

## Code snippet
```
@tasker_routes.route('/filter', methods=['GET'])
def filtered_taskers():
    currentUser = current_user.to_dict()
    currentUserId = currentUser['id']
    cityId = request.args.get('cityId')
    taskTypeId = request.args.get('taskTypeId')
    task_date = date.fromisoformat(request.args.get('date'))
    task_time = time.fromisoformat(request.args.get('time'))
    task_date_time = datetime.combine(task_date,task_time)
    searchResult = Tasker.query.join(Task,and_(Task.taskerId == Tasker.id , Task.dateTime == task_date_time, Task.status == "created"),isouter=True).filter(and_(Tasker.status == STATUS_ACTIVE , Tasker.citiesId == cityId , Tasker.taskTypesId == taskTypeId,Task.id == None, Tasker.userId != currentUserId)).all()
    if searchResult:
        result = {r.id : r.to_dict_gettask() for r in searchResult}
        return result
    else:
        return {'message': "Not Found"},404
```

## Future features
- Reviews
- Payments & billing

## Reach me on
- [Linkdin](https://www.linkedin.com/in/suchitra-mohan/)
