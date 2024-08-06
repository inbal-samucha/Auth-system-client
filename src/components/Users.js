import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {

  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try{
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        
        isMounted && setUsers(response.data);
      }catch(err){
        console.log('err in Users component ', err)
        navigate('/login', { state: { from: location }, replace: true}); // TODO: check the video React Login Authentication with JWT Access, Refresh Tokens, Cookies and Axios in 35:00
      }
    }

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length 
      ?
        (
        <ul>
          {users.map((user, i) => <li key={i}>{user?.fullName}</li>)}
        </ul>
        ) : (
          <p>No users to display</p>
        )
      }
    </article>
  )
}

export default Users;
