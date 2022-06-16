import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { Pagenation } from "../parts/Pagenation";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserList = (props) => {
    const [numUsers, setNumUsers] = useState(0);

    // 初期状態で表示するデータを呼び出す
    useEffect(() => {
        fetch("/users?page=1")
            .then((res) => res.json())
            .then((data) => {
                const usersData = data[0].data;
                const numUsersData = data[1];

                setNumUsers(numUsersData);
                props.setUsers(usersData);
            });
    }, []);

    // ページネーションで表示する追加分を呼び出し
    const handlePaginate = (page) => {
        fetch(`/users?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                const usersData = data[0].data;
                props.setUsers(usersData);
            });
    };

    const userItem = props.users.map((item) => {
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
                sum={numUsers}
                per={2}
                onChange={(e) => handlePaginate(e.page)}
            />
        </div>
    );
};
