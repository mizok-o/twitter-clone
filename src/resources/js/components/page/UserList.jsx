import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { Pagenation } from "../parts/Pagenation";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserList = () => {
    const [authUserFollows, setAuthUserFollows] = useState([]);
    const [users, setUsers] = useState([]);

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    // 認証ユーザーの情報取得
    const getAuthUserData = async () => {
        const res = await fetch("/auth-user");
        if (res.status === 200) {
            const authUserData = await res.json();
            return authUserData;
        }
    };

    // 認証ユーザーがフォローしているリストを配列でsetAuthUserFollowsにセット
    const checkAuthUserFollows = (authUserFollows) => {
        const authUserFollowsList = authUserFollows.map((data) =>
            Number(data.followed_user_id)
        );

        setAuthUserFollows(authUserFollowsList);
    };

    // 認証ユーザーがフォローしているユーザーリストをauthUserFollowsにセットする
    useEffect(() => {
        // 認証ユーザーのプロフィールとフォロー関係データを呼び出す
        getAuthUserData().then((authUserData) => {
            checkAuthUserFollows(authUserData.follows);
        });
    }, []);

    const [numUsers, setNumUsers] = useState(0);
    // １ページ目の情報取得
    const getFirstPage = async () => {
        const res = await fetch("/users?page=1");
        if (res.status === 200) {
            const firstPage = await res.json();
            return firstPage;
        }
    };
    // 認証ユーザーにフォローされているかをユーザー一覧に付与する
    const addIsFollowing = (users) => {
        const usersData = users.map((user) => {
            return {
                ...user,
                is_following: authUserFollows.includes(user.id),
            };
        });
        setUsers(usersData);
    };

    //１ページ目に表示するデータにフォロー状態を付与して返す
    useEffect(() => {
        getFirstPage().then((data) => {
            // ページネーション用に表示する全ユーザー数をセット
            setNumUsers(data.numUsers);

            addIsFollowing(data.users.data);
        });
    }, [authUserFollows]);

    // ページネーション時に、追加分を呼び出し
    const handlePaginate = async (page) => {
        const res = await fetch(`/users?page=${page}`);
        if (res.status === 200) {
            const nextPage = await res.json();
            addIsFollowing(nextPage.users.data);
        }
    };

    const userItem = users.map((item) => {
        return (
            <li key={item.id}>
                <div className="user__item-container">
                    <Link to={`/profile/${item.id}`}>
                        <div className="d-flex px-2 py-4 w-100">
                            <UserIcon iconData={item.profile_image_path} />
                            <div className="ms-2 flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <UserName
                                        nameData={{
                                            screen_name: item.screen_name,
                                            user_name: item.user_name,
                                        }}
                                    />
                                    <FollowButton
                                        userId={item.id}
                                        isFollowing={item.is_following}
                                        users={users}
                                        authUserFollows={authUserFollows}
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
