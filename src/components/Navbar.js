

import React, { useEffect, useState, useContext } from 'react';
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Navigate, useNavigate } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { MyContext } from '../context';


const Navbar = ({ isLogin, togglePopup }) => {
  const [buttonVisiblty, setButtonVisibility] = useState(true);
  const { darkMode, setDarkMode } = useContext(MyContext);

  // Temayı değiştir
  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark", !darkMode); // Tema class'ını değiştirme
   
  };


  useEffect(() => {
    if (isLogin) {
      setButtonVisibility(false);
      console.log("false");
    } else {
      setButtonVisibility(true);
      console.log("true");
    }
  }, [isLogin]);

  const navigate = useNavigate("/about");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kullanıcı giriş durumu

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Giriş çıkış işlemi
  };


  return (
    <nav className='navbar'
      style={{ fontWeight: "bold", background: "white", padding: "10px", color: "#01268f", borderBottom: "2px solid #01268f" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo ve Başlık */}
        <div className="d-flex align-items-center mx-auto">
          <button onClick={() => navigate("/")} style={{ background: 'transparent', border: 'none' }}>
            <img src='./images/pomoLogo.png' alt='Logo' style={{ marginRight: '10px', maxHeight: '50px' }} /></button>
          <h1 className='navbar_baslik m-0'>My Pomodoro Timer</h1>
        </div>
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={darkMode}
            onChange={handleToggleTheme}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <FaMoon className="fa-moon" />
            <MdSunny className="fa-sun" />
            <span className="ball"></span>
          </label>
        </div>
        <button onClick={togglePopup} className='btnlogin d-flex align-items-center m-1'>
          <FaUsers style={{ fontSize: '2rem' }} />
        </button>
        {buttonVisiblty && (
          <button onClick={(e) => navigate("/login")} className='btnlogin d-flex align-items-center'>
            <RiAccountPinCircleFill style={{ fontSize: '2rem' }} />
            <p className='m-1 p-0'>Giriş Yap</p>

          </button>
        )}
      </div>
    </nav>
  );

}; export default Navbar;