import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/auth/refresh_token', {
      withCredentials: true
    })
    setAuth(prev => {
      console.log('Previous auth state:', JSON.stringify(prev));
      console.log('New access token:', response.data.accessToken);
      return {
        ...prev, 
        role: response.data.role,
        accessToken: response.data.accessToken
      }
    });

    return response.data.accessToken;
  }

  return refresh;
}

export default useRefreshToken