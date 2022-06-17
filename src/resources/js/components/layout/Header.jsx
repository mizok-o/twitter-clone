import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export const Header = () => {
    // ログイン状態によってトグル内表示を変更する
    const dropdownItem = () => {
        // if (!isLogined) {
        //     return (
        //         <>
        //             <Dropdown.Item to="/userlist" value="1">
        //                 ログイン
        //             </Dropdown.Item>
        //             <Dropdown.Item to="/userlist" value="2">
        //                 新規登録
        //             </Dropdown.Item>
        //         </>
        //     );
        // }
        return (
            <>
                <Dropdown.Item to="/userlist" value="1">
                    プロフィール
                </Dropdown.Item>
                <Dropdown.Item to="/login" value="2">
                    ログアウト
                </Dropdown.Item>
            </>
        );
    };

    return (
        <header>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <Link to="/">
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
                                <Dropdown.Menu>{dropdownItem()}</Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};
