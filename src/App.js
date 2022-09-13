import "./App.css";
import { Routes, Route,Navigate } from "react-router-dom";
import Signup from "./component/Signup";
import NotFound from "./component/NotFound";
import Signin from "./component/Signin";
import Dashboard from "./component/Dashboard";
import Takequiz from "./component/Takequiz";
import Admin from "./component/admin";
import Da from "./component/Da";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Takequiz" element={<Takequiz />} />
        <Route path="/Da" element={<Da />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Signup" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
