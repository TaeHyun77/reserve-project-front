import { use } from 'react';
import api from './api';

// 로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`);

// 회원가입
export const join = (data) => api.post(`/member/save`, data);

// 유저 정보
export const info = () => api.get(`/member/info`)

export const venueList = () => api.get(`/venue/list`)

export const seatList = (screenInfoId) => api.get(`/seat/list/${screenInfoId}`)

export const reserveSeat = (seatsInfo, headers = {}) => {
    return api.post(`/reserve/reserve`, seatsInfo, { headers });
};

export const seatPrice = (performanceId) => api.get(`/seat/price/${performanceId}`)

export const payRewardToday = (today, headers = {}) => { return api.post(`/member/reward/${today}`, null, { headers }) }

export const checkUsername = (username) => api.get(`/member/check/validation/${username}`)

export const cancelReservation = (reserveNumber, headers = {}) => {
    return api.delete(`/reserve/delete/${reserveNumber}`, {
        headers
    });
}

export const register = (queueType, userId) => api.post(`/queue/register?userId=${userId}&queueType=${queueType}`)
