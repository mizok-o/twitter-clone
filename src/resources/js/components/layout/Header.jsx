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
        navigate("/profile-edit");
    };

    const logout = () => {
        fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
        }).then(() => {
            navigate("/login");
        });
    };

    return (
        <header>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <Link to="/tweet/new">
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
                            <Link className="header__text" to="/">
                                タイムライン
                            </Link>
                        </li>
                        <li className="fs-6">
                            <Link className="header__text" to="/userlist">
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
                                    <Dropdown.Item
                                        onClick={logout}
                                        href="/login"
                                        value="2"
                                    >
                                        ログアウト
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};
