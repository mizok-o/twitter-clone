import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { Pagenation } from "../parts/Pagenation";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserList = (props) => {
    const [countUserItem, setCountUserItem] = useState([]);

    // 初期状態で表示するデータを呼び出す
    useEffect(() => {
        fetch("/users")
            .then((res) => res.json())
            .then((data) => {
                setCountUserItem(data.length);
                const showPages = data.slice(0, 2);
                props.setUserData(showPages);
            });
    }, []);

    // ページネーションで表示する分のデータだけ呼び出す
    const handlePaginate = (page) => {
        fetch("/users")
            .then((res) => res.json())
            .then((data) => {
                const startPage = (page - 1) * 2;
                const showPages = data.slice(startPage, startPage + 2);
                props.setUserData(showPages);
            });
    };

    const userItem = props.userData.map((item) => {
        return (
            <li key={item.id}>
                <div className="user__item-container">
                    <Link to={`/users/${item.id}`}>
                        <div className="d-flex px-2 py-4 w-100">
                            <UserIcon
                                iconData={{
                                    icon: item.profile_image_id,
                                }}
                            />
                            <div className="ms-2 flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <UserName
                                        nameData={{
                                            name: item.screen_name,
                                            id: item.user_name,
                                        }}
                                    />
                                    <FollowButton />
                                </div>
                                <div className="mt-1">
                                    <p>{item.profile}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </li>
        );
    });

    return (
        <div className="container-lg">
            <h1>ユーザ一覧</h1>
            <div className="border">
                <ul>{userItem}</ul>
            </div>
            <Pagenation
                sum={countUserItem}
                per={2}
                onChange={(e) => handlePaginate(e.page)}
            />
        </div>
    );
};
