import axios from 'axios';
import useAuth from '../hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [errMsg, setErrMsg] = useState('');


  const { setAuth } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    const handleOAuthCallback = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/api/auth/google/callback?code=${code}`, { withCredentials: true });
        localStorage.setItem('accessToken', response?.data?.accessToken);
        setAuth({ role: response.data.role , accessToken: response?.data.accessToken });
  
        navigate(from, { replace: true });
      } catch(err){
        if (!err.response){
          setErrMsg('No Server Response') //TODO: check where to put setErrMsg
        }
        else{
          setErrMsg(err.response?.data?.errors[0].message)
        }
      }

    }

    handleOAuthCallback();

  }, [navigate, location, from]);

  return <div>Loading...</div>;
};

export default OAuthCallback;

