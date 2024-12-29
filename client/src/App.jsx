import React from 'react';
import { Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from './components/PrivateRoute'
import NotFound from "./pages/NotFound";

const App = () => {
  return (
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/dashboard/*" element={<PrivateRoute element={ <Dashboard /> } />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default App;
