import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";
import { Pagenation } from "../parts/Pagenation";

export const TweetList = () => {
    const [users, setUsers] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [numUsers, setNumUsers] = useState(0);

    // １ページ目のツイートを取得
    const getTweets = async () => {
        const res = await fetch("/tweets?page=1");
        if (res.status === 200) {
            const tweetsData = await res.json();
            setUsers(tweetsData.users);
            setNumUsers(tweetsData.tweets.total);
            setTweets(tweetsData.tweets.data);
        }
    };

    useEffect(() => {
        getTweets();
    }, []);

    // ページネーション時に、追加分を呼び出し
    const handlePaginate = async (page) => {
        if (page < 1) return;
        const res = await fetch(`/tweets?page=${page}`);
        if (res.status === 200) {
            const tweetsData = await res.json();
            setTweets(tweetsData.tweets.data);
        }
    };

    const tweetItem = tweets.map((tweet) => {
        // ツイートユーザーの情報を取得
        const userData = users.find((data) => data.id === tweet.user_id);
        // console.log(userData);

        return (
            <li key={tweet.id}>
                <div className="user__item-container">
                    <Link to={`/tweet/${tweet.id}`}>
                        <div className="d-flex px-2 py-4 w-100">
                            <UserIcon
                                iconData={
                                    userData.profile_image_path
                                        ? userData.profile_image_path
                                        : "no-image.png"
                                }
                            />
                            <div className="ms-2 flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <UserName
                                        nameData={{
                                            screen_name: userData.screen_name,
                                            user_name: userData.user_name,
                                        }}
                                    />
                                </div>
                                <div className="mt-1">
                                    <p>{tweet.text}</p>
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
                <ul>{tweetItem}</ul>
            </div>
            <Pagenation
                sum={numUsers}
                per={10}
                onChange={(e) => handlePaginate(e.page)}
            />
        </div>
    );
};
