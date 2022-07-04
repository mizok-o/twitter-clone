import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export const Header = (props) => {
    const { authUserId } = props;
    const navigate = useNavigate();

    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const moveToProfile = () => {
        navigate(`/home/profile/${authUserId}`);
    };

    const logout = () => {
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
        }).then(() => (window.location.href = "/login"));
    };

    return (
        <header>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <Link to="/home/timeline">
                        <h1 className="fs-3">
                            <img
                                src="/images/twitter-logo.svg"
                                alt="Twitter アイコン"
                            />
                        </h1>
                    </Link>
                </div>
                <div className="header__right--container">
                    <ul className="d-flex align-items-center justify-content-between">
                        <li className="fs-6">
                            <Link className="header__text" to="/home/timeline">
                                タイムライン
                            </Link>
                        </li>
                        <li className="fs-6">
                            <Link className="header__text" to="/home/userList">
                                ユーザ一覧
                            </Link>
                        </li>
                        <li className="fs-5">
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="light"
                                    id="dropdown-basic"
                                    className="d-flex align-items-center border"
                                >
                                    <img
                                        src="/images/header-profile-icon.svg"
                                        alt="プロフィール アイコン"
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={moveToProfile}
                                        value="1"
                                    >
                                        プロフィール
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={logout} value="2">
                                        ログアウト
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
                <div className="header__tweetBtn">
                    <div className="w-100 h-100 rounded-circle background-twitter">
                        <Link className="w-100 h-100" to="/home/tweet/new">
                            <div className="w-100 h-100">
                                <svg
                                    className="header__tweetBtn--icon"
                                    fill="#ffffff"
                                    style={{ width: 24, height: 24 }}
                                >
                                    <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
