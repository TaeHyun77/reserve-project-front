import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../api/auth";
import Header from "../header/Header";
import { LoginContext } from "../contexts/LoginContextProvider";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const { isLogin } = useContext(LoginContext);
  const [venueList, setVenueList] = useState([])

  const getVenueList = async () => {

    try {
      const response = await auth.venueList();
      const data = response.data
      console.log(data)

      if (data != null) {
        setVenueList(data)
      } else {
        console.log("장소 리스트 없음")
      }
    } catch (error) {
      console.log(`장소 리스트 조회 에러 : ${error}`);
    }
  }

  useEffect(() => {
    getVenueList()
  }, [])

  return (
    <>
      <Header />
      <div className="home-container">
        {isLogin ? (
          <div className="home-content">

            {venueList.length === 0 ? (
              <p className="home-message">공연장 정보가 없습니다.</p>
            ) : (
              <>
                <p className="home-message">공연장을 선택해보세요!</p>
                <div className="place-card-container">
                  {venueList.map((venue) => (
                    <div
                      key={venue.id}
                      className="place-card"
                      onClick={() => navigate(`/venue/${venue.id}`)}                      
                    >
                      <h2>{venue.name}</h2>
                      <p>{venue.location}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <h1 className="home-title">환영합니다 👋</h1>
            <p className="home-message">로그인하여 공연을 예매해보세요</p>

            <div className="home-content">

              {venueList.length === 0 ? (
                <p className="home-message">공연장 정보가 없습니다.</p>
              ) : (
                <>
                  <div className="place-card-container">
                    {venueList.map((venue) => (
                      <div
                        key={venue.id}
                        className="place-card"
                        onClick={() => navigate(`/venue/${venue.id}`)}                      
                      >
                        <h2>{venue.name}</h2>
                        <p>{venue.location}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;