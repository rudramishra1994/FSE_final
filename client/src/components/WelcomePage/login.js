import React from 'react';
import '../../stylesheets/welcome.css'; 
const LoginForm = ({ onRegisterClick,onBackClick })=>{

    const handleSubmit = (e) =>{
        e.preventDefault();
    }

  
    return (
      <div className='loginContainer'>
           <button className='backButton' onClick={onBackClick}>&larr; Back</button>
        <h2>Login your account</h2>
        <form className = 'form'  onSubmit={handleSubmit}>
            <input className = 'loginInput' type="text" placeholder="username" />
            <input className = 'loginInput' type="password" placeholder="password" />
            <button className='btn-3d' >Login</button>
        </form>  
        <button className='btn-3d' onClick={onRegisterClick}>Create Account</button>
      </div>
    );
  }

  export default LoginForm;