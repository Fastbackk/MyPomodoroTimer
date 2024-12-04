import './App.css';
import React, { useEffect, useState } from 'react';
import { IoIosSkipForward } from "react-icons/io";
import Navbar from './Navbar';
import Task from './components/Task';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyValues from './components/MyValues';
import { LuTimerReset } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


function App() {
  const [isCompleted, SetIsCompleted] = useState(false);
  const [bgColorGeneral, setbgColorGeneral] = useState("#ff656f");
  const [bgColorOtherGrids, setbgColorOtherGrids] = useState("#fd8186");
  const [buttonTextValue, setButtonTextValue] = useState("Start!");
  const [leftTime, setLeftTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomo, setIsPomo] = useState(true);
  const [myPomos, setMyPomos] = useState(0);

  //timer fonksiyonu kodları
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setLeftTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval); // Sayaç sıfırlandığında durdur
            completed(true);
            return 0;
          }
          else {

          }
          return prevTime - 1; // Her saniye geri say
        });
      }, 1000); // 1000 ms = 1 saniye
    }
    return () => clearInterval(interval); // Bileşen unmount olduğunda interval temizlenir
  }, [isRunning]); // isRunning state'ine bağlı olarak tekrar çalışır

  const start = () => {
    if (isPomo) {
      playSound();
    }

    setIsRunning((prevState) => {
      const newState = !prevState;
      setButtonTextValue(newState ? "Stop" : "Start");
      return newState;
    });
  };
  const completed = (isCompleted) => {
    if (isCompleted) {
      skip();
      SetIsCompleted(false);
      playSound_finished();

    } else {
      skip();
      SetIsCompleted(true);
      
    }
  }

  const skip = () => {
    if (isPomo) {
      // Pomodoro'dan mola moduna geçiş
      setLeftTime(5 * 60); // 5 dakika olarak ayarla
      setIsPomo(false); // Mola moduna geçiş
      setbgColorGeneral("#01268f");
      setbgColorOtherGrids("#01268f");
      setButtonTextValue("Start");
      setIsRunning(false); // Mola modunda durdur, Start butonuna basılınca başlasın
    } else {
      // Mola modundan Pomodoro'ya geçiş
      setLeftTime(25 * 60); // 25 dakika olarak ayarla
      setIsPomo(true); // Pomodoro moduna geçiş
      setbgColorGeneral("#ff656f");
      setbgColorOtherGrids("#fd8186");
      setButtonTextValue("Start");
      setIsRunning(false); // Pomodoro'ya geçerken durdur, Start butonuna basılınca başlasın
      setMyPomos(myPomos + 1);
    }
  };

  const resetTime = () => {
    const confirmReset=window.confirm("Zamanlayıcıyı sıfırlamak istediğinize emin misiniz?");
    if(confirmReset){
    setIsRunning(false);
    setLeftTime(25 * 60); // Reset yapınca 25 dakikaya dön
    setIsPomo(true); // Pomodoro modu
    setbgColorGeneral("#ff656f");
    setbgColorOtherGrids("#fd8186");
    setButtonTextValue("Start");
    setMyPomos(0);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60); // Dakika kısmı
    const seconds = timeInSeconds % 60; // Saniye kısmı
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const playSound = () => {
    const audio = new Audio('images/tick.mp3');
    audio.play();
  };
  const playSound_finished = () => {
    const audio = new Audio('images/finishSound.wav');
    audio.play();
  };

  return (
    <div className="div1 d-flex flex-column">
      <Navbar></Navbar>
      <div className='justify-content-center d-flex flex-row mt-4' style={{ flex: 1 }}>
        {/* SOL BÖLÜM/*/}
        <div className='custom_div' style={{ transition: '0.4s', backgroundColor: bgColorOtherGrids }}>
          <MyValues myPomos={myPomos}></MyValues>
        </div>
        {/* POMODORO BÖLÜMÜ/*/}
        <div className='custom_div general d-flex justify-content-center' style={{ fontFamily: 'Parkinsans, sans-serif', backgroundColor: bgColorGeneral, transition: '0.4s' }}>
          <p className='myPomos' style={{ fontFamily: 'Pacifico,cursive', fontSize: 'xx-large' }}>#{myPomos}</p>
          <p style={{ fontOpticalSizing: 'auto', fontWeight: '800', fontStyle: 'normal', fontSize: '13vh' }}>{formatTime(leftTime)}</p>
          <div className='d-flex justify-content-center align-items-start' style={{ width: '100%', height: '40%' }}>
            <button className='resetbutton' onClick={resetTime}>
              <LuTimerReset />
            </button>
            <button className="startbutton" onClick={start}>
              {isRunning ? "Durdur" : "Başlat"}
            </button>
            <IoIosSkipForward
              onClick={skip}
              className="resetbutton"

              style={{ marginTop: '3%', visibility: isRunning ? "visible" : "collapse", }} />
          </div>
        </div>
        {/* SAĞ BÖLÜM/*/}
        <div className='custom_div rightBar' style={{ transition: '0.4s', backgroundColor: bgColorOtherGrids }}>
          <Task></Task>
        </div>
      </div>

      <footer className="d-flex flex-column bg-primary text-white p-3 bg-dark">
        <div className="container">
          <div className="text-center mt-3">
            <button className='footerIconButton'> <FaGithub onClick={(e)=> window.location.href ="https://github.com/Fastbackk"} className='g_icon fs-1' /></button>
            <button className='footerIconButton'> <FaLinkedin onClick={(e)=> window.location.href="https://www.linkedin.com/in/mahmut-tunahan-akta%C5%9F-942699267/"} className='l_icon fs-1' /></button>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>Mahmut Tunahan Aktaş tarafından geliştirildi.</p>
          <p>&copy; 2024 My Pomodoro Timer. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
