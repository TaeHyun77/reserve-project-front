import React, { useState } from "react";
import * as auth from "../api/auth";
import { useNavigate } from "react-router-dom";
import "./JoinForm.css";
import Header from "../header/Header";

const JoinForm = () => {

  const navigate = useNavigate()

  const onJoin = (e) => {
    e.preventDefault();

    const form = e.target;

    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const name = form.name.value.trim();
    const email = form.email.value.trim();

    const user = {
      username: username,
      password: password,
      name: name,
      email: email,
    };

    join(user);
  };

  const join = async (form) => {
    console.log(form);

    let response;
    let data;

    try {
      response = await auth.join(form);
    } catch (error) {
      console.error(`${error}`);
      console.error(`회원가입 중 에러가 발생하였습니다.`);
      alert(`회원가입 중 오류가 발생했습니다 ..!`);
      return;
    }

    data = response.data;
    const status = response.status;
    console.log(`data : ${data}`);
    console.log(`status : ${status}`);

    if (status === 200) {
      console.log(`회원가입 성공 !!`);
      alert(`회원가입 성공 !`);
      navigate("/login");
    } else {
      console.log(`회원가입 실패.. !!`);
      alert(`회원가입 실패.. !!`);
    }
  };

  return (
    <>
      <Header />
      <div className="join_container">
        <h2 className="join-title">회원가입</h2>

        <form className="join-form" onSubmit={(e) => onJoin(e)}>
          <div>
            <label htmlFor="username">아이디</label>
            <p className="form-hint">
              대문자, 숫자를 적어도 하나 이상 포함해야 하며,  특수문자는 (@#%*^)만 허용됩니다.
            </p>
            <p className="form-hint2">
              ⭐️ 공백 및 하이픈(-)을 사용할 시 자동으로 제거됩니다. ⭐️
            </p>
            <input
              type="text"
              id="username"
              placeholder="username"
              name="username"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              name="password"
              autoComplete="password"
              required
            />
          </div>

          <div>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              placeholder="name"
              name="name"
              autoComplete="name"
              required
            />
          </div>

          <div>
            <label htmlFor="age">나이</label>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="age"
              list="ageList"
              required
            />
            <datalist id="ageList">
              <option value="20대" />
              <option value="30대" />
              <option value="40대" />
              <option value="50대" />
              <option value="60대" />
            </datalist>
          </div>

          <div>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              name="email"
              autoComplete="email"
              required
            />
          </div>

          <button
            className="btn-join"
            style={{ marginTop: "10px" }} >
            가입
          </button>
        </form>
      </div>
    </>
  );
};

export default JoinForm;
