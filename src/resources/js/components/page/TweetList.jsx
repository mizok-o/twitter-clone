import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";
import { Pagenation } from "../parts/Pagenation";

export const TweetList = () => {
    const [users, setUsers] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [numUsers, setNumUsers] = useState(0);

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const getUsers = async () => {
        const res = await fetch("/users");
        if (res.status === 200) {
            const firstPage = await res.json();
            setUsers(firstPage.users.data);
        }
    };

    const getTweets = async () => {
        const res = await fetch("/tweets?page=1");
        if (res.status === 200) {
            const tweetsData = await res.json();
            setNumUsers(tweetsData.tweets.total);
            setTweets(tweetsData.tweets.data);
        }
    };

    // ツイート一覧をtweetsにセット
    useEffect(() => {
        getUsers().then(() => {
            getTweets();
        });
    }, []);

    const deleteTweets = async (id) => {
        const res = await fetch(`/destroy-tweet-${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
        });
        if (res.status === 200) {
            console.log("deleted!!");
        }
    };

    const deleteTweet = (e, id) => {
        e.preventDefault();
        deleteTweets(id);
    };

    // ページネーション時に、追加分を呼び出し
    // const handlePaginate = async (page) => {
    //     const res = await fetch(`/tweets?page=${page}`);
    //     if (res.status === 200) {
    //         const tweetsData = await res.json();
    //         setTweets(tweetsData.tweets.data);
    //     }
    // };

    const tweetItem = tweets.map((tweet) => {
        // ツイートユーザーの情報を取得
        const userData = users.find((data) => data.id === tweet.user_id);

        return (
            <li key={tweet.id}>
                <div className="user__item-container">
                    <Link to={`/tweet/${tweet.id}`}>
                        <div className="d-flex px-2 py-4 w-100">
                            <UserIcon
                                iconData={{
                                    icon: userData.profile_image_path,
                                }}
                            />
                            <div className="ms-2 flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <UserName
                                        nameData={{
                                            name: userData.screen_name,
                                            id: userData.user_name,
                                        }}
                                    />
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={(e) =>
                                            deleteTweet(e, tweet.id)
                                        }
                                    >
                                        削除
                                    </button>
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
            {/* <Pagenation
                sum={numUsers}
                per={10}
                onChange={(e) => handlePaginate(e.page)}
            /> */}
        </div>
    );
};
