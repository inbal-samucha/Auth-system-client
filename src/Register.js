import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Register = () => {

  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState('');
  const [formData, setFormData] = useState ({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }


  const handleSignup = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      console.log(response);
      navigate("/login");
    }catch(err){
      console.log("in err catch block:", err.response.data.errors[0].message);
      setErrMsg(err.response.data.errors[0].message)
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
        <h1>Register</h1>

      <form onSubmit={handleSignup}>
        <label htmlFor='email'>email:</label>
        <input 
          type='text'
          id='email'
          name='email'
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

        <label htmlFor='firstName'>first name:</label>
        <input 
          type='text'
          id='firstName'
          name='firstName'
          onChange={handleChange}
          required
        />

        <label htmlFor='lastName'>last name:</label>
        <input 
          type='text'
          id='lastName'
          name='lastName'
          onChange={handleChange}
          required
        />

        <button type='submit' >Signup</button>
      </form>
    </section>
  )
}

export default Register;
