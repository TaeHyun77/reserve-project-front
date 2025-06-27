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
        <img
          src="/erd.png"
          alt="ERD Diagram"
          style={{ width: "100%", maxWidth: "800px", margin: "20px auto", display: "block" }}
        />
        <p>티켓 예약 → 좌석 선택 → 결제 , 포인트 리워드 지급의 일련의 과정에서 동시성을 다뤄보고 해결해보고자 하는 프로젝트입니다.</p>
        <p>멱등성( Idempotency )을 기반으로 결제 및 취소 API의 중복 호출로 인한 오류를 방지했습니다.</p>
        <p>동시성 문제가 발생할 수 있는 리워드 지급, 결제 등의 핵심 로직에  Redis 분산 락을 도입하여 충돌을 방지했습니다.</p>
        <p>장소(place)나 공연(performance)을 삭제할 경우, 관련된 상영 정보(screenInfo)를 삭제하고 이에 대한 좌석(seat)도 함께 삭제되도록 설정되어 있지만
          , 상영 마감 시간 이전에 회원(member)의 예약이 존재하는 경우에는 삭제가 불가능하도록 제한하였습니다. 
        </p>
      </div>
    </>
  );
};

export default About;
