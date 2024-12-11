import React, { useState, useEffect } from "react";

function MyValues({ myPomos }) {

    const [zaman, setzaman] = useState(0);
    const [dakika, setdakika] = useState(0);
    const [image1Visibilty, setImage1Visibilty] = useState(false);
    const [image2Visibilty, setImage2Visibilty] = useState(false);
    const [image3Visibilty, setImage3Visibilty] = useState(false);
    const [image4Visibilty, setImage4Visibilty] = useState(false);
    const [image5Visibilty, setImage5Visibilty] = useState(false);
    const [image5size, setimage5size] = useState(70);
    //saati ve dakika ve aşağıdaki resimlerin kontrolü
    useEffect(() => {
        const hour = Math.floor((myPomos * 25) / 60);
        const minute = ((myPomos * 25) % 60);
        setdakika(minute);
        setzaman(hour);


        if (myPomos !== 0) {
            const check_images = myPomos % 4;
            if (check_images === 0) {
                setImage1Visibilty(true);
                setImage2Visibilty(true);
                setImage3Visibilty(true);
                setImage4Visibilty(true);
                setImage5Visibilty(true);
                setimage5size(120);
            } else if (check_images === 3) {
                setImage1Visibilty(true);
                setImage2Visibilty(true);
                setImage3Visibilty(true);
            }
            else if (check_images === 2) {
                setImage1Visibilty(true);
                setImage2Visibilty(true);
            }
            else if (check_images === 1) {
                setImage1Visibilty(true);
            }
        } else {
            setImage1Visibilty(false);
            setImage2Visibilty(false);
            setImage3Visibilty(false);
            setImage4Visibilty(false);
            setImage5Visibilty(false);
        }
    }, [myPomos]);


    useEffect(() => {
        let timer;
        let timeout1, timeout2;

        if (image5Visibilty) {
            // 1 saniyelik bir büyüme animasyonu
            timer = setInterval(() => {
                setimage5size(120);
            }, 1000);

            // 2 saniye sonra diğer resimleri gizle
            timeout1 = setTimeout(() => {
                setImage1Visibilty(false);
                setImage2Visibilty(false);
                setImage3Visibilty(false);
                setImage4Visibilty(false);
            }, 2000);

            // 2.2 saniye sonra 5. resmi gizle
            timeout2 = setTimeout(() => {
                setImage5Visibilty(false);
                setimage5size(70)
            }, 2200);
        }

        return () => {
            if (timer) clearInterval(timer);
            if (timeout1) clearTimeout(timeout1);
            if (timeout2) clearTimeout(timeout2);
        };
    }, [image5Visibilty]);



    return (
        <div className="d-flex flex-column justify-content-center" style={{ fontFamily: 'Parkinsans, sans-serif' }}>
            <p className="text-center fs-4 m-4" style={{ borderBottom: "3px solid white" }}>İstatistiklerim</p>
            <p className="fs-3 mt-5">Çalışma Saati: {zaman}s {dakika}dk</p>
            <div className="d-flex flex-column align-items-center">
                <img style={{ transition: '0.4s', visibility: image5Visibilty ? "visible" : "hidden", width: image5size, height: image5size, transition: '0.8s' }} src="/images/fourPomo.png" alt="Logo"></img>
                <div className="d-flex justify-content-center mt-4">
                    <img className="pomo1" src="/images/pomoElement.png" alt="Logo" style={{ visibility: image1Visibilty ? "visible" : "hidden", width: '60px', height: '60px', marginRight: '5px' }}></img>
                    <img className="pomo2" src="/images/pomoElement.png" alt="Logo" style={{ visibility: image2Visibilty ? "visible" : "hidden", width: '60px', height: '60px', marginRight: '5px' }}></img>
                    <img className="pomo3" src="/images/pomoElement.png" alt="Logo" style={{ visibility: image3Visibilty ? "visible" : "hidden", width: '60px', height: '60px', marginRight: '5px' }}></img>
                    <img className="pomo4" src="/images/pomoElement.png" alt="Logo" style={{ visibility: image4Visibilty ? "visible" : "hidden", width: '60px', height: '60px' }}></img>
                </div>
            </div>
        </div>
    );
} export default MyValues;