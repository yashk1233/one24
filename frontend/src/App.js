import logo from './logo.svg';
import './App.css';
import Homepage from './component/Homepage';
import Navbar from './component/Navbar';
import Signup from './component/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/Login';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar></Navbar> */}
      {/* <Homepage /> */}
      <Routes>
        <Route exact path="/home" element={
        <div>
<Navbar></Navbar>
        <Homepage />
        </div>
        } />
        <Route exact path="/dashboard" element={<Dashboard />} />


        <Route exact path="/signup" element={
          <div>
          <Navbar></Navbar>
            <Homepage />

            <Signup />
          </div>
        } />

        <Route exact path="/login" element={
          <div>
          <Navbar></Navbar>
            <Homepage />
            <Login />
          </div>
        } />



      </Routes>
    </BrowserRouter>
    // <Signup></Signup>
  );
}

export default App;
