import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { Pagenation } from "../parts/Pagenation";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserList = () => {
    const [authUserfollows, setAuthUserFollows] = useState([]);
    const [users, setUsers] = useState([]);

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    // /authuser 認証ユーザーの情報取得
    const getAuthUserData = async () => {
        const res = await fetch(`/authuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
        });
        if (res.status === 200) {
            const authUserData = await res.json();
            return authUserData;
        }
    };

    // 認証ユーザーがフォローしているユーザ一覧を配列でsetAuthUserFollowsにセット
    const checkAuthUserFollows = (authUserFollows, authUserId) => {
        const authUserFollowsList = authUserFollows
            .filter((data) => {
                return Number(data["follow_user_id"]) === authUserId;
            })
            .map((data) => {
                return Number(data["followed_user_id"]);
            });
        setAuthUserFollows(authUserFollowsList);
    };

    // 認証ユーザーがフォローしているユーザーリストをauthUserfollowsにセットする
    useEffect(() => {
        // 認証ユーザーのプロフィールとフォロー関係データを呼び出す
        // authUserData[0]: 認証ユーザーのフォロー関係データ、
        // authUserData[1].id: authのユーザーID
        getAuthUserData().then((authUserData) => {
            checkAuthUserFollows(authUserData[0], authUserData[1].id);
        });
    }, []);

    const [numUsers, setNumUsers] = useState(0);
    // １ページ目の情報取得
    const getFirstPage = async () => {
        const res = await fetch("/users?page1");
        if (res.status === 200) {
            const firstPage = await res.json();
            return firstPage;
        }
    };
    // 認証ユーザーにフォローされているかをユーザー一覧に付与する
    const addIsFollowing = (users) => {
        const usersData = users.map((item) => {
            item.is_following = false;
            if (authUserfollows.includes(item.id)) {
                item.is_following = true;
            }
            return item;
        });
        // console.log(usersData);
        setUsers(usersData);
    };

    //１ページ目に表示するデータにフォロー状態を付与して返す
    useEffect(() => {
        // data[0].data: １ページ目の情報をusersにセットする
        getFirstPage().then((data) => {
            // ページネーション用に表示する全ユーザー数をセット
            const numUsers = data[1] - 1;
            setNumUsers(numUsers);

            const usersData = data[0].data;
            addIsFollowing(usersData);
        });
    }, [authUserfollows]);

    // ページネーション時に、追加分を呼び出し
    const handlePaginate = async (page) => {
        const res = await fetch(`/users?page=${page}`);
        if (res.status === 200) {
            const nextPage = await res.json();
            addIsFollowing(nextPage[0].data);
        }
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
                                        authUserfollows={authUserfollows}
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
