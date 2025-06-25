import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import Header from "../header/Header";
import "./screening_schedule.css";

const ScreeningSchedule = () => {
    const { venueId, performanceId } = useParams();
    const [groupedScreens, setGroupedScreens] = useState({});

    const fetchScreenList = async () => {
        try {
            const response = await api.get(`/screenInfo/list/${venueId}/${performanceId}`);
            console.log("조회된 상영 정보:", response.data);

            const grouped = {};

            response.data.forEach((screen) => {
                const title = screen.performance.title;
                if (!grouped[title]) {
                    grouped[title] = [];
                }
                grouped[title].push(screen);
            });

            // 그룹 내 상영 시간 정렬
            for (const title in grouped) {
                grouped[title].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
            }

            setGroupedScreens(grouped);
        } catch (error) {
            console.error("상영 정보 조회 실패:", error);
        }
    };

    useEffect(() => {
        fetchScreenList();
    }, [venueId, performanceId]);

    return (
        <>
            <Header />
            <div className="screening-schedule-container">
                {Object.keys(groupedScreens).length > 0 ? (
                    Object.entries(groupedScreens).map(([title, screens]) => (
                        <div key={title} className="performance-group">
                            <h2 className="performance-title">{title}</h2>
                            <div className="screen-list-container">
                                {screens.map((screen) => (
                                    <Link to={`/Seat/${screen.id}`} key={screen.id} className="screen-card-link">
                                        <div className="screen-card">
                                            <p>날짜: {screen.screeningDate}</p>
                                            <p>
                                                {new Date(screen.startTime).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false
                                                })} -{' '}
                                                {new Date(screen.endTime).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false
                                                })}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="loading-message">상영 정보를 불러오는 중...</p>
                )}
            </div>
        </>
    );
};

export default ScreeningSchedule;