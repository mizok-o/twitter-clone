import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { FollowNumbers } from "../parts/FollowNumbers";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserProfile = (props) => {
    const { authUserId, authUserFollows } = props;

    const [user, setUser] = useState({});
    const [isFollowing, setIsFollowing] = useState(false);
    const [isAuth] = useState(authUserId === Number(id));

    // ユーザーIDの取得
    const { id } = useParams();

    const getUserProfile = async () => {
        const res = await fetch(`/users/${id}`);
        if (res.status === 200) {
            const userProfile = await res.json();
            setUser(userProfile);
        }
    };

    useEffect(() => {
        setIsFollowing(authUserFollows.includes(Number(id)));
        getUserProfile();
    }, [authUserFollows]);

    const profileButton = () => {
        if (isAuth) {
            return (
                <Link to="/profile-edit">
                    <button type="button" className="btn btn-outline-dark">
                        編集
                    </button>
                </Link>
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
                <div>
                    <div className="d-flex p-1">
                        <Link to="/home/userList">
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
                            iconData={user.profile_image_path}
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
