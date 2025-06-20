import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./home/Home"

import LoginContextProvider from "./contexts/LoginContextProvider"

import Login from "./login/LoginForm"
import Join from "./join/JoinForm"

import About from "./About"
import Place from "./place/Place";
import Seat from "./seat/Seat"

const App = () => {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/place/:id" element={<Place />} />
          <Route path="/Seat/:placeId/:performanceId" element={<Seat />} />

        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
};

export default App;
