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
        <ProtectedRoute path='/taskers/:taskerId' exact={true} >
          <TaskerPage />
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
        <Route path='/task-new/:taskTypeId' exact={true}>
          <TaskDetailsForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
