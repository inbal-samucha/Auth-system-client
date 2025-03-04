import React from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const REGISTER_URL = '/auth/register';
const Register = () => {
  const userRef = useRef();

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState ({
    firstName: '',
    lastName: '',
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


  const handleSignup = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(REGISTER_URL, formData, { withCredentials: true });

      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
    }catch(err){
      console.log("in err catch block:", err.response.data.errors[0].message);
      setErrMsg(err.response.data.errors[0].message)
      setSuccess(false);
    }
  }

  return (
    <>
    {success ? (
      <section>
        <h1>Success!</h1>
        <p>
        <Link to="/login">Sign In</Link>
        </p>
      </section>
    ) : (
    <section className='center'>
          <p
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>

        <form onSubmit={handleSignup}>
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

        <div className='txt_field'>
          <label htmlFor='firstName'>first name:</label>
          <input 
            type='text'
            id='firstName'
            name='firstName'
            onChange={handleChange}
            required
          />
        </div>

        <div className='txt_field'>
          <label htmlFor='lastName'>last name:</label>
          <input 
            type='text'
            id='lastName'
            name='lastName'
            onChange={handleChange}
            required
          />
        </div>

          <button 
            type='submit' 
            disabled={!formData.email || !formData.password || !formData.firstName || !formData.lastName ? true : false}
          >
            Sign Up
          </button>
        </form>

        <div className='users_signup'>
        <p>
          Already registered?
          <span>
            <Link to="/login">Sign In</Link>
          </span>
        </p>
        </div>
      </section>
    ) 
    } 
    </>   
  )
}

export default Register;
