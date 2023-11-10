import logo from './logo.svg';
import Login from './components/Login';
import Registration from './components/Registration';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { AuthProvider } from './components/auth';
import Profile from './components/Profile';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Logout from './components/Logout';
import Users from './components/Users';
import NotFound from './components/NotFound';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <br /><br /><br />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:userId' element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/users' element={<AuthenticatedRoute><Users /></AuthenticatedRoute>} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/register/:authserver/:username' element={<Registration />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword/:token' element={<ResetPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
