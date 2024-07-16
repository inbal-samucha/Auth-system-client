import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {

  const [errMsg, setErrMsg] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      console.log(response);
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
    <h1>Login</h1>

  <form onSubmit={handleLogin}>
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

    <button type='submit' >Login</button>
  </form>
</section>
)
}

export default Login;

