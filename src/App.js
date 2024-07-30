import { Route, Routes } from "react-router-dom"
import  Register  from "./components/Register";
import  Login  from "./components/Login";
import LinkPage from './components/LinkPage';
import Home from "./components/Home";
import Admin from "./components/Admin";
import Unauthorized from "./components/Unauthorized";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import RequireAuth from './components/RequireAuth';
import PersistLogin from "./components/PersistLogin";

function App() {
  return (

    <Routes>
          <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login/>} ></Route>
          <Route path="register" element={<Register/>}></Route>
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["user", "admin"]}  />}>
          <Route>
          <Route path="/" element={<Home />} />
          </Route>

          <Route>
          <Route path="/admin" element={<Admin />} />
          </Route>
          
          </Route>
          </Route>

          
        {/* catch all */}
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>

  );
}

export default App;
