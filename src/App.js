import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./component/Signup";
import NotFound from "./component/NotFound";
import Signin from "./component/Signin";
import Dashboard from "./component/Dashboard";
import Takequiz from "./component/Takequiz";
import Admin from "./component/admin";
import Profile from "./component/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Takequiz" element={<Takequiz />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Signin" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
