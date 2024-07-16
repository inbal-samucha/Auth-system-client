import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import  Register  from "./Register";
import  Login  from "./Login";

function App() {
  return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>

        <Routes>
          <Route exact="true" path="/login" element={<Login/>} ></Route>
          <Route exact="true" path="/register" element={<Register/>}></Route>
        </Routes>
        </div>
      </Router>
  );
}

export default App;
