import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/welcome.css';
import OptionsView from './components/WelcomePage/optionviews';
import LoginForm from './components/WelcomePage/login';
import RegisterForm from './components/WelcomePage/register';
import illustration from './images/welcome.jpg';
const WelcomePage = ()=> {
  const [activeView, setActiveView] = useState('options'); // options, login, register
  //const showOptionsView = () => setActiveView('options');
  const showLoginView = () => {
    setActiveView('login');
  }
  const showRegisterView = () => {
    setActiveView('register');
 }
 const onBackClick =()=>{
    setActiveView('options');
}



  return (
    <div className='page'>
     <div className='leftColumn'>

        <img src={illustration} alt="Welcome Illustration" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

      </div>
      <div className='rightColumn'>
        {activeView === 'options' && <OptionsView  onLogin={showLoginView} onRegister={showRegisterView}/>}
        {activeView === 'login' && <LoginForm onRegisterClick={showRegisterView} onBackClick={onBackClick} />}
        {activeView === 'register' && <RegisterForm onLoginClick={showLoginView} onBackClick={onBackClick} />}
      </div>
    </div>
    
  );
}

export default WelcomePage;
