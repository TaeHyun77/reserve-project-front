import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";
import { v4 as uuidv4 } from 'uuid';
import * as auth from "../api/auth";
import Header from "../header/Header"
import "./Payment.css"

const Payment = () => {
    const navigate = useNavigate();
    const { isLogin } = useContext(LoginContext);
    const [userInfo, setUserInfo] = useState();

    const location = useLocation();
    const seatsInfo = location.state;

    const [useReward, setUseReward] = useState(false); // 결제 시 포인트 사용 여부

    const price = seatsInfo.seatPrice * seatsInfo.personCount; // 총 가격
    const usedReward = useReward ? Math.min(userInfo.reward, price) : 0;  // 할인 가격

    const getUserInfo = async () => {
        if (!isLogin) {
          navigate("/login");
          return;
        }
    
        try {
          const response = await auth.info();
          const data = response.data;
          console.log("Fetched userInfo:", data);
          setUserInfo(data);
        } catch (error) {
          console.error("사용자 정보를 불러오는 중 에러 발생", error);
        }
      };

    const handlePayment = async () => {

        const check = window.confirm("결제 하시겠습니까 ?")
        if (!check) return;

        const idempotencyKey = uuidv4(); // 멱등키 생성
        const headers = {
            'Idempotency-key': idempotencyKey,
        };
        console.log(idempotencyKey)

        const paymentInfo = {
            screenInfoId: seatsInfo.screenInfoId,
            seats: seatsInfo.seats,
            usedReward: usedReward
        }

        try {
            const response = await auth.reserveSeat(paymentInfo, headers);

            if (response.status === 200) {
                alert("결제 성공 ! 좌석이 예약되었습니다.");
                navigate("/");
            }

        } catch (error) {
            console.error("예약 실패:", error);

            const errorCode = error?.response?.data?.code;
            const errorMessage = error?.response?.data?.message;

            if (errorCode) {
                switch (errorCode) {
                    case "TIMEOUT":
                        alert("응답 지연으로 재시도합니다...");
                        return await auth.reserveSeat(seatsInfo, headers)
                    case "SEAT_ALREADY_RESERVED":
                        alert("이미 예약된 좌석이 포함되어 있습니다.");
                        break;
                    case "NOT_ENOUGH_CREDIT":
                        alert("보유하신 금액이 부족합니다.");
                        break;
                    case "SEAT_NOT_FOUND":
                        alert("선택한 좌석 정보를 찾을 수 없습니다.");
                        break;
                    default:
                        alert("예약 실패: " + (errorMessage || "알 수 없는 오류"));
                }
            } else {
                alert("예약 중 오류가 발생했습니다. 서버 응답이 없습니다.");
            }
        }
    };

    useEffect(() => {
        if (isLogin) {
            getUserInfo();
        }
    }, [isLogin]);

    return (
        <>
            <Header />
            <div className="payment-container">
                <h2>결제 확인</h2>
                <div className="payment-detail">
                    <p><strong>선택한 좌석 :</strong> {seatsInfo.seats.join(", ")}</p>
                    <p><strong>인원 수 :</strong> {seatsInfo.personCount}명</p>
                    <label className="payment_price">
                        <p><strong>보유 포인트 :</strong> {userInfo?.reward}P</p>
                        <button
                            className="reward-toggle-button"
                            onClick={() => {
                                if (userInfo.reward <= 0) {
                                    alert("사용 가능한 포인트가 없습니다.");
                                    return;
                                }
                                setUseReward((prev) => !prev);
                            }}
                        >
                            {useReward ? "사용 취소" : "포인트 사용"}
                        </button>
                    </label>
                    <p><strong>결제 금액 :</strong> {price - usedReward}원</p>
                </div>
                <button className="payment-button" onClick={handlePayment}>
                    결제하기
                </button>
            </div>
        </>
    );
};

export default Payment;