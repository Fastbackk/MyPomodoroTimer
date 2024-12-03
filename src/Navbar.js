import React, { useState } from 'react';



const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kullanıcı giriş durumu

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Giriş çıkış işlemi
  };


  return (
    <nav className='navbar navbar-expand-lg navbar-light d-flex justify-content-center' style={{fontWeight:"bold",background:"white" ,padding: "10px",color:"#01268f",borderBottom:"2px solid #01268f"}}>
      <div className="d-flex justify-content-center align-items-center" style={{width: '100%', height: '5vh'}}>
      <img src='./images/pomoLogo.png' alt='Logo' style={{marginRight:'20px',maxHeight:'50px'}}></img>
        <h1>My Pomodoro Timer</h1>
      </div>
      
      
    </nav>
  );



}; export default Navbar;