import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Header from "../header/Header";
import "./Venue.css"

const Place = () => {
    const navigate = useNavigate();
    const { venueId } = useParams();
    const [performanceList, setPerformanceList] = useState([]);

    const getPerformanceList = async () => {
        try {
            const response = await api.get(`/performance/list/${venueId}`);

            console.log(response.data)

            setPerformanceList(response.data);
        } catch (error) {
            console.error("장소 조회 실패:", error);
        }
    };

    useEffect(() => {
        getPerformanceList();
    }, [venueId]);

    return (
        <>
            <Header />
            <div className="performance-card-container">
                {performanceList.length > 0 ? (
                    performanceList.map((performance) => (
                        <div
                            key={performance.id}
                            className="performance-card"
                            onClick={() => navigate(`/screening_schedule/${venueId}/${performance.id}`)}
                            style={{ cursor: "pointer" }} 
                        >
                            <div className="performance-title">{performance.title}</div>
                            <div className="performance-type">{performance.type}</div>
                            <div className="performance-duration">상영 시간: {performance.duration}</div>
                        </div>
                    ))
                ) : (
                    <p>공연 정보를 불러오는 중...</p>
                )}
            </div>
        </>
    );
};

export default Place;