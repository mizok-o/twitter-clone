import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const TweetDetail = () => {
    const [tweet, setTweet] = useState({});
    const [user, setUser] = useState({});

    // ユーザーIDの取得
    const { id } = useParams();

    const getTweet = async () => {
        const res = await fetch(`/tweet-${id}`);
        if (res.status === 200) {
            const tweetData = await res.json();
            return tweetData;
        }
    };

    const getUserData = async () => {
        const res = await fetch(`/user-${id}`);
        if (res.status === 200) {
            const userData = await res.json();
            setUser(userData);
        }
    };

    const cutPostedDate = (dateData) => {
        return dateData.split("T")[0].replace(/-/g, "/");
    };

    useEffect(() => {
        getTweet().then((tweetData) => {
            tweetData.created_at = cutPostedDate(tweetData.created_at);
            setTweet(tweetData);

            // ツイートユーザーの情報を取得
            getUserData();
        });
    }, []);

    const postedDate = () => {
        const date = tweet.created_at;

        return date;
    };

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
                            iconData={{
                                icon: user.icon,
                            }}
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
                        <p className="pt-2">投稿日: {postedDate()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
