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
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

    const options = {
      redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL,
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(" ")
    };

    console.log('process.env.REACT_APP_', process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL);

    console.log(options);

    const qs = new URLSearchParams(options)

    console.log( qs.toString());

    const url = `${rootUrl}?${qs.toString()}`;

    return url
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])

  return (

    <section>
    <p
      className={errMsg ? "errmsg" : "offscreen"}
      aria-live="assertive"
    >
      {errMsg}
    </p>
    <h1>Login</h1>

  <form onSubmit={handleLogin}>
    <label htmlFor='email'>email:</label>
    <input 
      type='text'
      id='email'
      name='email'
      ref={userRef}
      onChange={handleChange}
      required
    />

    <label htmlFor='password'>password:</label>
    <input 
      type='password'
      id='password'
      name='password'
      onChange={handleChange}
      required
    />

    <button 
      type='submit' 
      disabled={!formData.email || !formData.password ? true : false}
      >
        Login
      </button>

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
    <br/>
      <a href={getGoogleOauthURL()}>Login with google</a> <br />

      <p>
          Need new account? <br/>
          <span>
            <Link to="/register">Sign In</Link>
          </span>
        </p>
    </section>
  )
}

export default Login;

