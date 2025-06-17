import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";
import "./Header.css";

const Header = () => {
  const { isLogin, userInfo, logout } = useContext(LoginContext);

  // 드롭다운 상태 관리
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <span className="logo-text">Reserve System Project</span>
        </Link>
      </div>
      <div className="util">
        <ul>
          {!isLogin ? (
            <>
              <li>
                <Link to="/about">소개글</Link>
              </li>
              <li>
                <Link to="/join">회원가입</Link>
              </li>
              <li>
                <Link to="/login">로그인</Link>
              </li>

            </>
          ) : (
            <>
              <li><h5 class="user-text">{userInfo?.name}님 환영합니다</h5></li>

              <li>
                <button onClick={logout}>
                  로그아웃
                </button>
              </li>

              <li>
                <Link to="/about">소개글</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
