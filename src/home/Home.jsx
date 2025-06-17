import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { LoginContext } from "../contexts/LoginContextProvider";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isLogin, userInfo, logout } = useContext(LoginContext);

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-title">환영합니다 👋</h1>
        {isLogin ? (
          <div className="home-content">
            <p className="home-message">
              안녕하세요 {userInfo?.username}님 !!
            </p>
          </div>
        ) : (
          <p className="home-message">로그인을 해주세요</p>
        )}
      </div>
    </>
  );
};

export default Home;