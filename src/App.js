import './App.css';
import React, { useEffect, useState,useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IoIosSkipForward } from "react-icons/io";
import Navbar from './components/Navbar';
import Task from './components/Task';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyValues from './components/MyValues';
import { LuTimerReset } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Login from './components/Login';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { FaArrowUp } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { HiMiniUserCircle } from "react-icons/hi2";
import { MyContext, MyContextProvider } from './context';


function Main() {
  const { darkMode, myPomos, setMyPomos } = useContext(MyContext);
  const [topButtonVisible, settopButtonVisible] = useState(false);
  const [isCompleted, SetIsCompleted] = useState(false);
  const [bgColorGeneral, setbgColorGeneral] = useState("#ff656f");
  const [bgColorOtherGrids, setbgColorOtherGrids] = useState("#fd8186");
  const [buttonTextValue, setButtonTextValue] = useState("Start!");
  const [leftTime, setLeftTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomo, setIsPomo] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false)

  //popup'u açıp kapatan function
  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  //Süreyi sekmeye yazdırma
  useEffect(() => {
    if (isPomo) {
      document.title = formatTime(leftTime) + " - Odaklanma Vakti! - ";
    } else if (!isPomo) {
      document.title = formatTime(leftTime) + " - Dinlenme Vakti - ";

    }

  }, [leftTime]);

  //yukarıya dönme buttonu kodları
  // Sayfa kaydırma durumu değiştikçe butonun görünür olup olmamasını kontrol eder
  const handleScroll = () => {
    if (window.scrollY > 300) { // 300px'den fazla kaydırma yapılınca buton görünsün
      settopButtonVisible(true);
    } else {
      settopButtonVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);;
    console.log("dark mode " +darkMode);
    return () => window.removeEventListener('scroll', handleScroll);

    
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  };
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
    const confirmReset = window.confirm("Zamanlayıcıyı sıfırlamak istediğinize emin misiniz?");
    if (confirmReset) {
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
  function Popup({ togglePopup }) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get("https://jsonplaceholder.typicode.com/users");
          setUsers(response.data);
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, []);
    // Yükleniyor durumunda
    if (loading) return <p>Yükleniyor...</p>;

    // Hata durumunda
    if (error) return <p>Hata: {error}</p>;

    // Veriyi başarıyla aldıysak
    return (
      <div className="popup-container">
        <div className="popup-content">
          <div className="close-div">
            <button className='popup-close-button' onClick={togglePopup}>
              <IoClose style={{ fontSize: '2rem' }} />
            </button>
          </div>
          <h4 style={{marginTop:'10px'}}>Pomodoro Timer'ı kullanan diğer kullanıcılarımız</h4>
          <div className='list-container'>
            <ul>
              {users.map((user) => (
                <div style={{background:'#ff8597',display:'flex',border:'2px solid white',alignItems:'center', margin:'5px',borderRadius:'5px'}} key={user.id}>
                  <HiMiniUserCircle style={{ fontSize: '2rem' }} />
                  <p style={{ fontSize: '1rem', marginLeft: '5px' }}>
                    {user.name} - ({user.email})
                  </p>

                </div>
              ))}

            </ul>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={`div1 d-flex flex-column ${popupVisible ? 'popup-active' : ''}`}>
      <Navbar togglePopup={togglePopup} isLogin={false}></Navbar>
      {popupVisible && <Popup togglePopup={togglePopup} />}
      <div className={`anadiv justify-content-center d-flex flex-row ${popupVisible ? 'blur-background' : ''}`} style={{ flex: 1, paddingBottom: '12%' }}>
        {/* SOL BÖLÜM/*/}
        <div className='custom_div' style={{ transition: '0.4s', backgroundColor: bgColorOtherGrids }}>
          <MyValues myPomos={myPomos}></MyValues>
        </div>
        {/* POMODORO BÖLÜMÜ/*/}
        <div className='custom_div general d-flex justify-content-center mt-2' style={{ fontFamily: 'Parkinsans, sans-serif', backgroundColor: bgColorGeneral, transition: '0.4s' }}>
          <p className='myPomos' style={{ fontFamily: 'Pacifico,cursive', fontSize: 'xx-large' }}>#{myPomos}</p>
          <p className='timerText'>{formatTime(leftTime)}</p>
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
      <div className='whatPomo d-flex flex-column align-items-center' >
        <div style={{ marginTop: '10%', width: '45%', height: '4px', background: '#fb637b', borderRadius: '25px' }}></div>
        <div className='content_whatPomo'>
          <div className='d-flex mb-4 align-items-center'>
            <img src="/images/pomoElement.png" alt="Logo" style={{ width: '100px', height: '100px' }}></img>
            <h1 style={{ marginLeft: '2%', fontFamily: 'Pacifico,cursive' }}>Pomodoro Tekniği Nedir?</h1>
          </div>
          <p>Pomodoro Tekniği, verimli çalışma ve zaman yönetimi için geliştirilmiş popüler bir tekniktir. 1980'lerin sonunda Francesco Cirillo tarafından yaratılan bu yöntem, adını İtalyanca "domates" anlamına gelen pomodoro kelimesinden alır. Cirillo, çalışırken kullandığı domates şeklindeki zamanlayıcısından esinlenerek bu ismi vermiştir. <br></br> <br></br>
            Bu teknik, çalışma sürelerini 25 dakika olarak belirler ve her 25 dakikalık yoğun çalışmayı, kısa bir 5 dakikalık ara ile takip eder. Her dört pomodoro (çalışma süresi) sonunda ise daha uzun bir ara (15-30 dakika) verilir. Pomodoro Tekniği, odaklanmayı artırarak, sıkıcı ve uzun çalışma seanslarını daha verimli ve motive edici hale getirmeyi amaçlar.
            <br></br>  <br></br>
            <h4>Pomodoro'nun Faydaları:</h4>
            <br></br>
            <ul>
              <li><strong>Odaklanmayı Artırır: </strong>Kısa çalışma aralıkları, dikkat dağılmalarını engeller.</li><br></br>
              <li><strong>Zamanı Verimli Kullanır: </strong>Her pomodoro'nun sonunda kısa molalar vererek yenilenmiş bir zihinle çalışmaya devam edilir.</li><br></br>
              <li><strong>Zihinsel Yorgunluğu Azaltır: </strong>Uzun süreli kesintisiz çalışmalardan kaynaklanan yorgunluğu engeller.</li><br></br>
              <li><strong>Hedef Belirleme: </strong>Her bir pomodoro bir hedefe yönelik olmalıdır, bu da başarı duygusunu pekiştirir.</li><br></br><br></br>
            </ul>
          </p>
        </div>
      </div>

      {topButtonVisible && (
        <button onClick={scrollToTop} style={{
          padding: '10px', color: 'white', border: 'none', cursor: 'pointer', transition: 'opacity 0.3s ease', zIndex: '1000', position: 'fixed', background: '#fb5e7a', borderRadius: '20px', float: 'right', bottom: '20px',
          right: '20px'
        }}><FaArrowUp style={{ fontSize: '40px' }} /></button>)}
      <footer className="d-flex flex-column bg-primary text-white p-3 bg-dark">
        <div className="container">
          <div className="text-center mt-3">
            <button className='footerIconButton'> <FaGithub onClick={(e) => window.location.href = "https://github.com/Fastbackk"} className='g_icon fs-1' /></button>
            <button className='footerIconButton'> <FaLinkedin onClick={(e) => window.location.href = "https://www.linkedin.com/in/mahmut-tunahan-akta%C5%9F-942699267/"} className='l_icon fs-1' /></button>
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
function App() {

  return (
    <MyContextProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />;
      </Routes>
    </BrowserRouter>
    </MyContextProvider>
  );
} export default App;
