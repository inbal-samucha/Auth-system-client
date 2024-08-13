import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage');
    }

    return (
        <section className="center">
            <h1>Home</h1>
            <br />

            <div className="link">
            <p>You are logged in!</p>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>

            <div>
                <button className='btn' onClick={signOut}>Sign Out</button>
            </div>

            </div>

        </section>
    )
}

export default Home