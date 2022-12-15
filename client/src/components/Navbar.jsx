import React, { useState } from "react";
import Button from "./Button";
import menuItems from "./MenuItems";
import "./Navbar.css";
import Home from "./Home";
import About from "./About";
import Register from "./register/register";
import Login from "./login/login"
import Passwords from "./Passwords";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const Navbar = () => {
  const [active, setActive] = useState(false);
  const [ user, setLoginUser] = useState({})

  const handleClick = () => {
    setActive(!active);
  };
  

  return (
    <Router>
    <nav className="navbar">
      <h1 className="navbar-logo">
        Password Manager 🔐
      </h1>
      <div className="menu-icon" onClick={handleClick}>
      
        <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={active ? "nav-menu active" : "nav-menu"} onClick={handleClick}>
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link  to={item.url} className={item.cName}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
     
    </nav>
    <Routes>
          <Route path="/" element={  <Login />}/>
          <Route path="/login" element={  <Login  setLoginUser={setLoginUser}/>}/>
          <Route path="/home" element={  <Home />}/>
          <Route path="/Passwords" element={  <Passwords />}/>
          <Route path="/About" element={  <About />}/>
          <Route path="/Sign_up" element={  <Register />}/>
        </Routes>
    </Router>
  );
};

export default Navbar;
