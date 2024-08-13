import { Link } from "react-router-dom"
import Users from "./Users"

const Admin = () => {
    return (
        <section className='center'>
            <h1>Admins Page</h1>
            <br />
            <Users />
            <div className="link">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin