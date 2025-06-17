import React from "react";
import Header from "./header/Header";
import "./About.css"

const About = () => {
  return (
    <>
      <Header />
      <div className="containerAbout">
        <h1>예약 시스템을 소개해요 !</h1>
        <hr />
        <p> 티켓 예약 → 좌석 선택 → 결제 → 포인트 리워드 지급의 일련의 과정에서 동시성을 다뤄보고자 하는 프로젝트입니다.</p>
      </div>
    </>
  );
};

export default About;
