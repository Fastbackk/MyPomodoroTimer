import React, { useState } from 'react';
import './App.css';


const Navbar=()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Kullanıcı giriş durumu

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn); // Giriş çıkış işlemi
      };
  

    return(
        <nav className='navbar' style={{ padding: "10px"}}>
          <h1>My Pomodoro Timer</h1>
          
        </nav>
    );



}; export default Navbar;