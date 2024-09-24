import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import ForgottenPassword from './component/ForgottenPassword';
import SignUp from './component/SignUp';
import Activate from './component/Activate';
import ResendActivateEmail from './component/ResendActivateEmail';
import Profile from './component/Profile';
import ResetPassword from './component/ResetPassword';
import About from './component/About';
import Features from './component/Features';
import Home from './component/Home';
import SignUpCompleted from './component/SignUpCompleted';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/activate/:token' element={<Activate />} />
        <Route path='/resend-activation-email/:token' element={<ResendActivateEmail />} />
        <Route path='/forgotten-password' element={<ForgottenPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='/features' element={<Features />} />
        <Route path='/sign-up-completed' element={<SignUpCompleted />} />
      </Routes>
      
    </div>
  );
}

export default App;
