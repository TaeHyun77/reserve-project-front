import api from './api'; 

// 로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`);

// 회원가입
export const join = (data) => api.post(`/member/save`, data);

// 유저 정보
export const info = () => api.get(`/member/info`)

export const placeList = () => api.get(`/place/list`)

export const seatList = (placeId, performanceId) => api.get(`/seat/list/${placeId}/${performanceId}`)

export const reserveSeat = (seatsInfo) => api.post(`/seat/reserve`, seatsInfo)

export const seatPrice = (performanceId) => api.get(`/seat/price/${performanceId}`)