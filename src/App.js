import './App.css';
import React, { useEffect, useState } from 'react';
import { IoIosSkipForward } from "react-icons/io";
import Navbar from './Navbar';
import Task from './components/Task';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyValues from './components/MyValues';
import { LuTimerReset } from "react-icons/lu";


function App() {
  const [isCompleted, SetIsCompleted] = useState(false);
  const [bgColorGeneral, setbgColorGeneral] = useState("#ff656f");
  const [bgColorOtherGrids, setbgColorOtherGrids] = useState("#fd8186");
  const [buttonTextValue, setButtonTextValue] = useState("Start!");
  const [leftTime, setLeftTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomo, setIsPomo] = useState(true);
  const [myPomos, setMyPomos] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

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
    setIsRunning(false);
    setLeftTime(25 * 60); // Reset yapınca 25 dakikaya dön
    setIsPomo(true); // Pomodoro modu
    setbgColorGeneral("#ff656f");
    setbgColorOtherGrids("#fd8186");
    setButtonTextValue("Start");
    setMyPomos(0);

  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60); // Dakika kısmı
    const seconds = timeInSeconds % 60; // Saniye kısmı
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  useEffect(() => {
    // 5 saniye sonra videoyu kaldır
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 5000);

    return () => clearTimeout(timer); // Temizlik
  }, []);

  const playSound = () => {
    const audio = new Audio('images/tick.mp3');
    audio.play();
  };

  const WickModeButton = () => {
    setShowVideo(true);

  };




  return (
    <div className="div1 d-flex flex-column">
      <Navbar></Navbar>
      <div>
        <button className='button5' style={{ float: "right", margin: "20px" }}>
          <img className='iconWick' src="/images/iconWick.png" alt="Icon Wick" />
          <p className='p_wick'>Wick Mode (Premium) </p>
        </button>
      </div>

      <div className='justify-content-center d-flex flex-row'>
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
    </div>
  );
}

export default App;
