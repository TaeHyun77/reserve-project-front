import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import * as auth from "../api/auth";
import "./Payment.css"

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const seatsInfo = location.state;
    const totalPrice = seatsInfo.seatPrice * seatsInfo.personCount;

    const handlePayment = async () => {

        const idempotencyKey = uuidv4(); // 멱등키 생성

        const headers = {
            'Idempotency-key' : idempotencyKey,
        };

        console.log(idempotencyKey)

        try {
            const response = await auth.reserveSeat(seatsInfo, headers);

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

    return (
        <div className="payment-container">
            <h2>결제 확인</h2>
            <div className="payment-detail">
                <p><strong>선택한 좌석:</strong> {seatsInfo.seats.join(", ")}</p>
                <p><strong>인원 수:</strong> {seatsInfo.personCount}명</p>
                <p><strong>결제 금액:</strong> {totalPrice}원</p>

            </div>
            <button className="payment-button" onClick={handlePayment}>
                결제하기
            </button>
        </div>
    );
};

export default Payment;