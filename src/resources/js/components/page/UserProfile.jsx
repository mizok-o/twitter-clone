import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { FollowNumbers } from "../parts/FollowNumbers";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";
import { UserTweets } from "../parts/UserTweets";

export const UserProfile = (props) => {
    const { authUserId, authUserFollows } = props;
    // ユーザーIDの取得
    const { id } = useParams();

    const [user, setUser] = useState({});
    const [isFollowing, setIsFollowing] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const getUserProfile = async () => {
        const res = await fetch(`/users/${id}`);
        if (res.status === 200) {
            const userProfile = await res.json();
            setUser(userProfile);
        }
    };

    useEffect(() => {
        console.log(id);
        setIsAuth(authUserId === Number(id));
        setIsFollowing(authUserFollows.includes(Number(id)));
        getUserProfile();
    }, [authUserFollows, id]);

    const profileButton = () => {
        if (isAuth) {
            return (
                <Link to="/home/profile-edit">
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
        <div className="mt-5 main__container">
            <div className="border">
                <div>
                    <div className="d-flex p-1 aligin-items-center">
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
                        <div className="me-3 omit__text__container">
                            <h2 className="omit__text">{user.screen_name}</h2>
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
                    <div className="non__omit">
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
                <UserTweets user={user} userId={id} />
            </div>
        </div>
    );
};
