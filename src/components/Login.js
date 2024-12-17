import { useFetcher, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import { useEffect, useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Login() {
    const navigate = useNavigate(); // useNavigate hook'unu tanımla
    const [password, setPassword] = useState("");
    const [passwordArray, setPasswordArray] = useState([]);
    const oncekiLenght = useRef(0);
    const [passwordStatus, setPasswordStatus] = useState("");
    const [bgcolor, setbgColor] = useState("red");
    const [divVisibilty, setdivVisibilty] = useState("hidden");
    const [passwordTrue, setPasswordTrue] = useState(false);
    const [rePassword, setRePassword] = useState("");
    const [rePasswordStatus, setRePasswordStatus] = useState("");
    const [RedivVisibilty, setRedivVisibilty] = useState("hidden");


    useEffect(() => {
        if (password.length > oncekiLenght.current) {
            //karakter fazlalığı var, demekki veri eklenecek.
            setPasswordArray([...passwordArray, password[password.length - 1]]);
        } else if (password.length < oncekiLenght.current) {
            setPasswordArray(passwordArray.slice(0, passwordArray.length - 1));
        }
        oncekiLenght.current = password.length;




    }, [password]);

    useEffect(() => {
        if (passwordArray.length === 0) {
            setdivVisibilty("hidden");
            setPasswordTrue(false);
        }
        else if (passwordArray.length >= 1) {

            setdivVisibilty("visible");
            if (passwordArray.length !== 0 && passwordArray.length < 5) {
                setPasswordStatus("Şifre çok güçsüz :(");
                setbgColor("red");
                setPasswordTrue(false);
            }
            else if (passwordArray.length !== 0 && passwordArray.length > 5 && passwordArray.length < 10) {
                setPasswordStatus("Eh işte, daha iyi olabilir :/");
                setbgColor("orange");
                setPasswordTrue(false);
            }
            else if (passwordArray.length !== 0 && passwordArray.length > 10) {
                setPasswordStatus("İşte şimdi oldu :)");
                setbgColor("green");
                setPasswordTrue(true);
            }

        }



    }, [passwordArray, password]);

    const goToLogin = () => {
        navigate('/');
    };


    useEffect(() => {

        if (password !== rePassword) {
            console.log("FARKLI!")
            setRedivVisibilty("visible");
            setRePasswordStatus("Şifreler Uyuşmuyor!")

        }
        else {
            setRedivVisibilty("hidden");
            setRePasswordStatus("");
        }





    }, [password, passwordTrue, rePassword]);

    const login = () => {

    };
    return (
        <div className="loginDiv">
            <Navbar isLogin={true}></Navbar>
            <div className="containerdiv">
                <img className="imgbla" src="/images/pomoElement.png" alt="Logo" style={{ width: '100px', height: '100px' }}></img>

                <div className="general_div">
                    <div className="input_div">
                        <span className="mt-5 span_text">Adınız ve Soyadınız</span>
                        <input className="input_text"></input>
                    </div>

                    <div className="input_div">
                        <span>Bir Profil İsmi Belirleyin</span>
                        <input className="input_text"></input>
                    </div>

                    <div className="d-flex align-items-center border-bottom" style={{ visibility: divVisibilty, width: '60%' }}>
                        <div style={{ background: bgcolor, width: '15px', height: '15px', borderRadius: '5px' }}></div>
                        <p className="m-0 p-2">{passwordStatus}</p>
                    </div>
                    <div className="input_div">
                        <span className="mt-2">Şifre Oluşturun</span>
                        <input onChange={(e) => setPassword(e.target.value)} className="input_text"></input>
                    </div>
                    <div className="input_div">
                        <span>Şifre tekrar</span>
                        <input onChange={(e) => setRePassword(e.target.value)} className="input_text"></input>
                    </div>
                    <div className="bg-primary d-flex align-items-center border-bottom" style={{ visibility: RedivVisibilty, width: '60%' }}>
                        <p className="m-0 p-2">{rePasswordStatus}</p>
                    </div>


                    <button onClick={login} className="btn fs-4" style={{ border: '2px solid', background: '#fd8186', color: 'white' }}>Kayıt Ol</button>
                </div>

            </div>
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
} export default Login;