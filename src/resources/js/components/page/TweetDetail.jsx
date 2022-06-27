import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const TweetDetail = () => {
    const [tweet, setTweet] = useState({});
    const [user, setUser] = useState({});

    // urlからツイートIDの取得
    const { id } = useParams();

    // 指定のツイートを取得
    const getTweet = async () => {
        const res = await fetch(`/tweets/${id}`);
        if (res.status === 200) {
            const tweetData = await res.json();
            return tweetData;
        }
    };

    // ツイート主のユーザー情報をuserにセット
    const setUserData = async (userId) => {
        const res = await fetch(`/users/${userId}`);
        if (res.status === 200) {
            const userData = await res.json();
            setUser(userData);
        }
    };

    // 日付データをyy/mm/ddに加工
    const editPostedDate = (dateData) => {
        return dateData.split("T")[0].replace(/-/g, "/");
    };

    // ツイートを取得してから、ユーザー情報を取得
    useEffect(() => {
        getTweet().then((tweetData) => {
            tweetData.created_at = editPostedDate(tweetData.created_at);
            setTweet(tweetData);

            setUserData(tweetData.user_id);
        });
    }, []);

    return (
        <div className="container-lg mt-5">
            <div className="border">
                <div className="d-flex align-items-center">
                    <Link to="/">
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
                    <div className="ms-3">
                        <h2>ツイート</h2>
                    </div>
                </div>
                <div className="py-1 px-2">
                    <div className="d-flex">
                        <UserIcon
                            userList={false}
                            iconData={user.profile_image_path}
                        />
                        <div className="ms-2">
                            <UserName
                                isUserProfile={true}
                                nameData={{
                                    screen_name: user.screen_name,
                                    user_name: user.user_name,
                                }}
                            />
                        </div>
                    </div>
                    <div className="my-2">
                        <p>{tweet.text}</p>
                        <p className="pt-2">投稿日: {tweet.created_at}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
