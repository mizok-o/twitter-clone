import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { FollowNumbers } from "../parts/FollowNumbers";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserProfile = () => {
    const [authUserFollows, setAuthUserFollows] = useState([]);
    const [user, setUser] = useState({});
    const [isFollowing, setIsFollowing] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    // ユーザーIDの取得
    const { id } = useParams();

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;
    // /authuser 認証ユーザーの情報取得
    const getAuthUserData = async () => {
        const res = await fetch("/authuser", {
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
            setIsAuth(authUserData.userId === Number(id));
            checkAuthUserFollows(authUserData.follows);
        });
    }, []);

    const getUserProfile = async () => {
        const res = await fetch(`/user-${id}`);
        if (res.status === 200) {
            const userProfile = await res.json();
            setIsFollowing(authUserFollows.includes(Number(id)));
            setUser(userProfile);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, [authUserFollows]);

    const profileButton = () => {
        if (isAuth) {
            return (
                <button type="button" className="btn btn-outline-dark">
                    編集
                </button>
            );
        } else {
            return (
                <FollowButton
                    userId={id}
                    user={user}
                    isFollowing={isFollowing}
                />
            );
        }
    };

    return (
        <div className="container-lg mt-5">
            <div className="border">
                <div onClick={() => console.log(isFollowing)}>
                    <div className="d-flex p-1">
                        <Link to="/userlist">
                            <button className="btn">
                                <svg
                                    viewBox="0 0 16 16"
                                    width="16"
                                    height="16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#111111"
                                    className="bi bi-arrow-left"
                                >
                                    <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                            </button>
                        </Link>
                        <div className="me-3">
                            <h2>{user.screen_name}</h2>
                        </div>
                    </div>
                    <div>
                        <img
                            className="w-100 bg-primary"
                            style={{ height: "160px" }}
                            src="/images/twitter-cover-example.png"
                            alt="プロフィール カバー画像"
                        />
                    </div>
                </div>
                <div className="p-3">
                    <div className="position-relative">
                        <div className="w-100 d-flex justify-content-end">
                            {profileButton()}
                        </div>
                        <UserIcon
                            userList={false}
                            iconData={{
                                icon: user.icon,
                                desc: user.iconDesc,
                            }}
                        />
                    </div>
                    <div>
                        <UserName
                            isUserProfile={true}
                            nameData={{
                                screen_name: user.screen_name,
                                user_name: user.user_name,
                            }}
                        />
                        <div className="mt-1">
                            <p>{user.profile}</p>
                        </div>
                    </div>
                    <FollowNumbers userId={id} isAuth={isAuth} />
                </div>
            </div>
            <div className="border">
                <p>ツイート一覧</p>
            </div>
        </div>
    );
};
