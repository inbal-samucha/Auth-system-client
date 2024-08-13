import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section className='center'>
            <h1>Links</h1>
            <br/>
            <h2>Public</h2>

            <div className="link">
                <Link className="link" to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>

            <br />
            <h2>Private</h2>

            <div className="link">
                <Link to="/">Home</Link> <br/>
                <Link to="/admin">Admin Page</Link>
            </div>

        </section>
    )
}

export default LinkPage