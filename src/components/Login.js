import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';

const LOGIN_URL = '/auth/login'

const Login = () => {
  const { setAuth } = useAuth();

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
      const accessToken = response?.data?.access_token;
      const role = response?.data?.role;
      setAuth({ user: formData?.email, role, accessToken });

      setFormData({
        email: '',
        password: ''
      });
      navigate(from, { replace: true });
      console.log(response);
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
      type='text'
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
  </form>

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

