import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import dotenv from 'dotenv'
// dotenv.config()

import axios from '../api/axios';

const LOGIN_URL = '/auth/login'

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef(); 

  const [errMsg, setErrMsg] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    userRef.current.focus();
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(LOGIN_URL, formData, { withCredentials: true });
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;

      setAuth({ user: formData?.email, role , accessToken });

      setFormData({
        email: '',
        password: ''
      });
      navigate(from, { replace: true });

    }catch(err){
      if (!err.response){
        setErrMsg('No Server Response')
      }
      else{
        console.log("in err catch block:", err.response.data.errors[0].message);
        setErrMsg(err.response?.data?.errors[0].message)
      }
    }
  }

  const togglePersist = () => {
    setPersist(prev => !prev);
  }



  
  const getGoogleOauthURL = () => {
    window.location.href = 'http://localhost:3000/api/auth/oauth-google'; // Your server URL
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])

  return (

    <section className='center'>
    <p
      className={errMsg ? "errmsg" : "offscreen"}
      aria-live="assertive"
    >
      {errMsg}
    </p>
    <h1>Login</h1>

  <form onSubmit={handleLogin}>
    <div className='txt_field'>
      <label htmlFor='email'>email:</label>
      <input 
        type='text'
        id='email'
        name='email'
        ref={userRef}
        onChange={handleChange}
        required
      />
    </div>

    <div className='txt_field'>
      <label htmlFor='password'>password:</label>
      <input 
        type='password'
        id='password'
        name='password'
        onChange={handleChange}
        required
      />
    </div>

    <button 
      type='submit' 
      disabled={!formData.email || !formData.password ? true : false}
      >
        Login
      </button>

      <button className='google' onClick={getGoogleOauthURL}>Login with Google</button>

      <div>
        <input 
          type='checkbox' 
          id='persist'
          onChange={togglePersist}
          checked={persist}
        />
        <label htmlFor='persist'> Trust this device</label>
      </div>
  </form>

   <div className='users_signup'>
      <p>
          Need new account? 
          <span>
          <Link to="/register">Sign Up</Link>
          </span>
        </p>
    </div>   
  </section>
  )
}

export default Login;

