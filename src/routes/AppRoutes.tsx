import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import TasksPage from '../pages/TasksPage';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/taskspage" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
