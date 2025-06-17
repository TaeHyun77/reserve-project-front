import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./home/Home"
import LoginContextProvider from "./contexts/LoginContextProvider"
import Login from "./login/LoginForm"
import Join from "./join/JoinForm"

import About from "./About"


const App = () => {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} /> 
          <Route path="/about" element={<About />} /> 

        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
};

export default App;
