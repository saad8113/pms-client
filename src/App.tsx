import { Routes, Route } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
