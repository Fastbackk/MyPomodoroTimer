import React, { useState, useEffect } from "react";

function MyValues({ myPomos }) {
    const [zaman, setzaman] = useState(0);
    const [dakika, setdakika] = useState(0);

    //saati ve dakikayı hesaplamak.
    useEffect(() => {
        const hour = Math.floor((myPomos * 25) / 60);
        const minute = ((myPomos * 25) % 60);
        setdakika(minute);
        setzaman(hour);
    }, [myPomos]);

    return (
        <div style={{ fontFamily: 'Parkinsans, sans-serif' }}>
            <p className="text-center fs-4 m-4" style={{ borderBottom: "3px solid white" }}>İstatistiklerim</p>
            <p className="fs-2 mt-5">ŞURAYA POMODOR LOGOSU EKLE KAÇ TANE OLDUPUNU Çalışma Saati: {zaman}s {dakika}dk</p>
        </div>
    );

} export default MyValues;