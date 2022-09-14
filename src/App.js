import './App.css';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from './Coponents/Nabar/Navbar';
import LanddingPage from './Coponents/Ladding-page/LanddingPage';
import Footer from './Coponents/Footer/Footer';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Coponents/Login/Login';
import SignUp from './Coponents/SignUp/SignUp';
import Dashboard from './Coponents/Dashboard/Dashboard';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Coponents/Nabar/Themes";

import logo from "./Asset/logo.png";
import logo1 from "./Asset/logo1.png";
import shieldLogoDark from "./Asset/shield-logo.png"
import shieldLogoLite from "./Asset/shield-logo1.png"
import SideBar from './Coponents/AdminPenal/SideBar/Sidebars';
import { useSelector } from 'react-redux';
function App() {
  let { isAdmin, isUser } = useSelector(state => state.isAuth);
  const [theme, setTheme] = useState("dark");
  let [logos, setLogos] = useState(logo1);
  let [shieldLogo, setShieldLogo] = useState(shieldLogoLite);
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      setLogos(logo);
      setShieldLogo(shieldLogoDark);
    } else {
      setTheme("dark");
      setLogos(logo1);
      setShieldLogo(shieldLogoLite);

    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        {
          !isAdmin && <>
            <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
              <Navbars theme={theme} shieldLogo={shieldLogo} logos={logos} toggleTheme={toggleTheme} isUser={isUser} />
              <Routes>
                {
                  !isUser && (
                    <>
                      <Route path='/' element={<LanddingPage />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/register' element={<SignUp />} />
                    </>
                  )
                }
                {
                  isUser && (
                    <>
                      <Route path='/dashboard' element={<Dashboard />} />
                      <Route path='/' element={<LanddingPage />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/register' element={<SignUp />} />


                    </>
                  )
                }
                <Route path="*" element={<Navigate to={isUser ? "/dashboard" : "/login"} />} />


              </Routes>
              <Footer shieldLogo={shieldLogo} logos={logos} />
            </ThemeProvider>
          </>
        }
        {
          isAdmin && <SideBar />
        }

      </BrowserRouter>
    </div>
  );
}

export default App;
