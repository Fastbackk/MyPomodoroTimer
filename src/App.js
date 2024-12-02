import './App.css';
import React, { useEffect, useState } from 'react';
import { IoIosSkipForward } from "react-icons/io";
import Navbar from './Navbar';
import { Nav } from 'react-bootstrap';
import Task from './components/Task';



function App() {
  const [isCompleted, SetIsCompleted] = useState(false);
  const [bgColor, setbgColor] = useState("#ffffff");
  const [bgColor2, setbgColor2] = useState("#ffffff");
  const [buttonTextValue, setButtonTextValue] = useState("Start!");
  const [leftTime, setLeftTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomo, setIsPomo] = useState(true);
  const [myPomos, setMyPomos] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [hour, setHour] = useState(0);

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
      setbgColor("#39848a");
      setbgColor2("#4c9097");
      setButtonTextValue("Start");
      setIsRunning(false); // Mola modunda durdur, Start butonuna basılınca başlasın
    } else {
      // Mola modundan Pomodoro'ya geçiş
      setLeftTime(25 * 60); // 25 dakika olarak ayarla
      setIsPomo(true); // Pomodoro moduna geçiş
      setbgColor("#000000");
      setbgColor2("#c15d5d");
      setButtonTextValue("Start");
      setIsRunning(false); // Pomodoro'ya geçerken durdur, Start butonuna basılınca başlasın
      setMyPomos(myPomos + 1);
    }
  };

  const resetTime = () => {
    setIsRunning(false);
    setLeftTime(25 * 60); // Reset yapınca 25 dakikaya dön
    setIsPomo(true); // Pomodoro modu
    setbgColor("#000000");
    setbgColor2("#c15d5d");
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
  // `myPomos` her güncellendiğinde 4'e bölündüğünde hour'ı artır
  useEffect(() => {
    if (myPomos % 4 === 0 && myPomos !== 0) {
      setHour(prevHour => prevHour + 1);
    }
    
  }, [myPomos]);
  const WickModeButton=()=>{
    setShowVideo(true);

  };
  
  return (
    <div className="div1" style={{ backgroundColor: bgColor }}>
      <Navbar></Navbar>
      <div className='container'>
      <div className='MyTrackers'>
        <Task></Task>
      </div>
      <div className="div2" style={{ backgroundColor: bgColor2 }}>
          <p className='myPomos'>#{myPomos}</p>
          <p className='myPomos'>{hour} Saat Çalıştın.</p>
          <h1 className="timeH">{formatTime(leftTime)}</h1>
          <div className="div3">
            <div className="div4">
              <button onClick={start} className="startButton">

                {isRunning ? "Stop" : "Start"}
              </button>


              <IoIosSkipForward
                onClick={skip}
                className="icon1"
                style={{
                  fontSize: "50px",
                  marginLeft: "5%",
                  visibility: isRunning ? "visible" : "collapse",
                }}
              />
              <button className='resetButton' onClick={resetTime}>Reset</button>
              <button onClick={WickModeButton} className='button5'>
                <img className='iconWick' src="/images/iconWick.png" alt="Icon Wick" />
                <p className='p_wick'>Wick Mode</p>
              </button>
            </div>


          </div>
        </div>
        <div className='myValues'>
          <h1>İstatistiklerim</h1>
        </div>
      </div>
      
      
        
       
     
    </div>
  );
}

export default App;
