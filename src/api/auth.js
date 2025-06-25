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
    return api.post(`/seat/reserve`, seatsInfo, { headers });
};

export const seatPrice = (performanceId) => api.get(`/seat/price/${performanceId}`)

export const setRewardDate = (today) => api.post(`/member/reward/${today}`)

export const checkUsername = (username) => api.get(`/member/check/validation/${username}`)