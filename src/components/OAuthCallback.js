import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const OAuthCallback = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const role = params.get('role');

    if (accessToken && role) {
      console.log('accessToken ', accessToken);
      // setAuth({ user: 'google_user', role, accessToken });
      setAuth({  role , accessToken });
      navigate('/', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [navigate, setAuth]);

  return <p>Logging you in...</p>;
};

export default OAuthCallback;



