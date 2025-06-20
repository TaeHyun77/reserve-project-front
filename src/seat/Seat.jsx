import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/Header";
import * as auth from "../api/auth";
import "./Seat.css";

const Seat = () => {
    const { placeId, performanceId } = useParams();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);
    const [personCount, setPersonCount] = useState(1); // 인원 수, 1 ~ 5명

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
            const response = await auth.seatList(placeId, performanceId);
            const data = response.data;

            const reserved = data
                .filter((seat) => seat.is_reserved)
                .map((seat) => seat.seatNumber);

            setReservedSeats(reserved);
        } catch (error) {
            console.error("예약 좌석 리스트 불러오기 실패 : " + error);
        }
    };

    const reserveSeats = async () => {
        if (selectedSeats.length === 0) {
            alert("좌석을 선택해주세요!");
            return;
        }

        const check = window.confirm("예약 하시겠습니까 ?")

        if (check) {
            try {
                const seatsInfo = {
                    placeId: Number(placeId),
                    performanceId: Number(performanceId),
                    seats: selectedSeats
                };

                const response = await auth.reserveSeat(seatsInfo);
                const data = response.data

                if (response.status == 200) {
                    alert("예약 성공!");
                    setSelectedSeats([]);
                } else {
                    alert("예약 실패: " + (data.message || "알 수 없는 오류"));
                }

            } catch (error) {
                console.error("예약 실패:", error);
                alert("예약 중 오류가 발생했습니다.");
            }
        }
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
                <h2>좌석을 선택하세요 🎟</h2>



                <div className="seat-grid">
                    {[...Array(totalRows)].map((_, row) =>
                        [...Array(totalCols)].map((_, col) => {
                            const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
                            const isReserved = reservedSeats.includes(seatId);
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

                <div className="person-counter">
                    <button onClick={decreasePerson}>-</button>
                    <span>{personCount}명</span>
                    <button onClick={increasePerson}>+</button>
                </div>

                <button className="reserve-button" onClick={reserveSeats}>
                    예약하기
                </button>
            </div>
        </>
    );
};

export default Seat;