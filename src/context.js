import React, { createContext, useState, useEffect } from 'react';


//Context oluşturuyoruz.

export const MyContext = createContext();

//Context Provider

export const MyContextProvider = ({ children }) => {
    const [myPomos, setMyPomos] = useState(()=>{
        //LocalStorage'de veri varsa çekip myPomos'un içine atar yoksa 0'dan başlatır.
        const storedPomos=localStorage.getItem('myPomos');
        return storedPomos ? JSON.parse(storedPomos): 0;
    });

    //myPomos'un değişikliklerini LocalStorage'e kaydet.

    useEffect(()=>{
        localStorage.setItem('myPomos',JSON.stringify(myPomos))

    },[myPomos]);


    
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true'; // localStorage'dan gelen değer string olduğundan true/false kontrolü yapıyoruz
    });

    useEffect(() => {
        // Tema değiştiğinde localStorage'a kaydet
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.body.classList.add('dark'); // Karanlık tema ekle
        } else {
            document.body.classList.remove('dark'); // Aydınlık tema ekle
        }
    }, [darkMode]);  // Sadece darkMode değeri değiştiğinde çalışır

    return (
        <MyContext.Provider value={{ darkMode, setDarkMode,myPomos, setMyPomos }}>
            {children}
        </MyContext.Provider>
    );

};

