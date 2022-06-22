import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { Pagenation } from "../parts/Pagenation";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserList = (props) => {
    //　一覧表示するユーザデータを入れる
    const [followsData, setFollowsData] = useState([]);
    const [numUsers, setNumUsers] = useState(0);
    const [users, setUsers] = useState([]);

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;
    // api呼び出し用
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf_token,
        },
    };

    // /authuser authユーザーの情報取得
    const getAuthUser = async () => {
        const res = await fetch(`/authuser`, options);
        if (res.status === 200) {
            const data = await res.json();
            return data;
        }
    };

    // 今フォローしているユーザ一覧を配列でsetFollowsDataにセット
    const setAuthFollows = (authFollows, authUserId) => {
        const authFollowsList = authFollows
            .filter((data) => {
                return Number(data["follow_user_id"]) === authUserId;
            })
            .map((data) => {
                return Number(data["followed_user_id"]);
            });
        console.log(authFollowsList);
        setFollowsData(authFollowsList);
    };

    useEffect(() => {
        // authユーザーのプロフィールとフォロー関係データを呼び出す
        // data[0]: authのフォロー関係データ、data[1].id: authのユーザーID
        getAuthUser().then((data) => {
            // authユーザーがフォローしているユーザーリストをFollowsDataにセットする
            setAuthFollows(data[0], data[1].id);
        });
    }, []);

    // １ページ目の情報取得
    const getFirstPage = async () => {
        const res = await fetch("/users?page1");
        if (res.status === 200) {
            const data = await res.json();
            return data;
        }
    };
    // フォローされているのかの情報をユーザー一覧に付与する
    const addIsFollowing = (users) => {
        const usersData = users.map((item) => {
            item.is_following = false;
            if (followsData.includes(item.id)) {
                item.is_following = true;
            }
            return item;
        });
        setUsers(usersData);
    };

    useEffect(() => {
        // data[0].data: １ページ目の情報をusersにセットする
        getFirstPage().then((data) => {
            const numUsers = data[1] - 1;
            setNumUsers(numUsers);

            const usersData = data[0].data;
            addIsFollowing(usersData);
        });
    }, [followsData]);

    // ページネーションで表示する追加分を呼び出し
    const handlePaginate = (page) => {
        fetch(`/users?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                const usersData = data[0].data;
                addIsFollowing(usersData);
            });
    };

    const userItem = users.map((item) => {
        return (
            <li key={item.id}>
                <div className="user__item-container">
                    <Link to={`/users/${item.id}`}>
                        <div className="d-flex px-2 py-4 w-100">
                            <UserIcon
                                iconData={{
                                    icon: item.profile_image_path,
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
                                    <FollowButton
                                        userId={item.id}
                                        isFollowing={item.is_following}
                                        users={users}
                                        followsData={followsData}
                                    />
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
        <div className="mt-4">
            <h1 onClick={() => console.log(users)}>ユーザ一覧</h1>
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
