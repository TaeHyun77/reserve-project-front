import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import * as auth from "../api/auth";
import Header from "../header/Header";
import { LoginContext } from "../contexts/LoginContextProvider";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { isLogin, userInfo, logout } = useContext(LoginContext);
  const [placeList, setPlaceList] = useState([])

  const getPlaceList = async () => {

    try {
      const response = await auth.placeList();
      const data = response.data
      console.log(data)

      if (data != null) {
        setPlaceList(data)
      } else {
        console.log("장소 리스트 없음")
      }
    } catch (error) {
      console.log(`장소 리스트 조회 에러 : ${error}`);
    }
  }

  useEffect(() => {
    getPlaceList()
  }, [])


  return (
    <>
      <Header />
      <div className="home-container">
        {isLogin ? (
          <div className="home-content">
            <p className="home-message">공연장을 선택해보세요!</p>

            <div className="place-card-container"
            >
              {placeList.map((place) => (
                <div key={place.id} className="place-card"
                  onClick={() => navigate(`/place/${place.id}`)}>
                  <h2>{place.name}</h2>
                  <p>{place.location}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h1 className="home-title">환영합니다 👋</h1>
            <p className="home-message">로그인을 해주세요</p>
          </>
        )}
      </div>
    </>
  );
};

export default Home;