import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage';
import TaskerPage from './components/TaskerPage';
import BecomeTaskerForm from './components/BecomeTaskerForm';
import TaskDetailsForm from './components/TaskDetailsForm';
import EditTaskerDetailsForm from './components/EditTaskerDetailsForm';
import MyTasks from './components/MyTasks'
import EditBookingForm from './components/EditBookingForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/tasks' exact={true} >
          <MyTasks />
        </ProtectedRoute>
        <ProtectedRoute path='/taskers/:taskerId' exact={true} >
          <TaskerPage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/tasks/:taskId/edit' exact={true} >
          <EditBookingForm />
        </ProtectedRoute>
        <ProtectedRoute path='/taskers/:taskerId/edit' exact={true} >
          <EditTaskerDetailsForm />
        </ProtectedRoute>
        <ProtectedRoute path='/new-tasker' exact={true}>
          <BecomeTaskerForm />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <ProtectedRoute path='/task-new/:taskTypeId' exact={true}>
          <TaskDetailsForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
