import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import * as auth from "../api/auth";
import "./Seat.css";

const Seat = () => {
    const navigate = useNavigate();

    const { screenInfoId } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState([]);
    const [personCount, setPersonCount] = useState(1); // 인원 수 : 1 ~ 5명

    const [seatPrice, setSeatPrice] = useState()

    const totalRows = 5;
    const totalCols = 5;

    const toggleSeat = (seatId) => {
        const isSelected = selectedSeats.includes(seatId);

        if (isSelected) {
            setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
        } else {
            if (selectedSeats.length < personCount) {
                setSelectedSeats((prev) => [...prev, seatId]);
            } else {
                alert(`최대 ${personCount}명까지만 선택할 수 있습니다.`);
            }
        }
    };

    const getSeatList = async () => {
        try {
            const response = await auth.seatList(screenInfoId);
            const data = response.data;
            console.log(data)

            const reserved = data
                .filter((seat) => seat.is_reserved)
                .map((seat) => seat.seatNumber);

            setSeats(reserved);

            if (data.length > 0) {
                const price = data[0]?.screenInfo?.performance?.price;
                setSeatPrice(price);
            }

        } catch (error) {
            console.error("예약 좌석 리스트 불러오기 실패 : " + error);
        }
    };

    const goToPayment = () => {
        if (selectedSeats.length === 0) {
            alert("좌석을 선택해주세요!");
            return;
        }

        const seatsInfo = {
            screenInfoId: screenInfoId,
            seats: selectedSeats,
            personCount: personCount,
            seatPrice: seatPrice
        };

        navigate("/payment", { state: seatsInfo });
    };

    useEffect(() => {
        getSeatList();
    }, []);

    const increasePerson = () => {
        setPersonCount((prev) => Math.min(prev + 1, 5));
    };

    const decreasePerson = () => {
        setPersonCount((prev) => Math.max(prev - 1, 1));
        setSelectedSeats((prev) => prev.slice(0, personCount - 1)); // 인원 수 줄이면 선택된 좌석도 줄임
    };

    return (
        <>
            <Header />
            <div className="seat-container">


                {seats.length === 0 ? (
                    <p className="no-seat-message">좌석 정보가 없습니다.</p>
                ) : (
                    <>
                        <h2>좌석을 선택하세요 🎟</h2>
                        <div className="seat-grid">
                            {[...Array(totalRows)].map((_, row) =>
                                [...Array(totalCols)].map((_, col) => {
                                    const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
                                    const isReserved = seats.includes(seatId);
                                    const isSelected = selectedSeats.includes(seatId);

                                    return (
                                        <div
                                            key={seatId}
                                            className={`seat ${isSelected ? "selected" : ""} ${isReserved ? "reserved" : ""}`}
                                            onClick={() => {
                                                if (!isReserved) toggleSeat(seatId);
                                            }}
                                        >
                                            {seatId}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </>
                )}

                {seats.length > 0 && (
                    <>
                        <div className="person-counter">
                            <button onClick={decreasePerson}>-</button>
                            <span>{personCount}명</span>
                            <button onClick={increasePerson}>+</button>
                        </div>

                        <button className="reserve-button" onClick={goToPayment}>
                            결제하기
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default Seat;