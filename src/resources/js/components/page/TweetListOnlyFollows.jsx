import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";
import { Pagenation } from "../parts/Pagenation";
import { EditButtns } from "../parts/EditButtns";

export const TweetListOnlyFollows = (props) => {
    const { authUserId, isLoading } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [numTweets, setNumTweets] = useState(0);
    const [tweets, setTweets] = useState([]);
    const [nofollows, setNoFollows] = useState(false);

    const getAllUsers = async () => {
        const res = await fetch("/users-all");
        if (res.status === 200) {
            const UsersData = await res.json();
            setUsers(UsersData);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    // １ページ目のツイートを取得
    const getTweets = async () => {
        const res = await fetch("/tweets-only-follows");
        if (res.status === 200) {
            const tweetsData = await res.json();
            if (!tweetsData.total) {
                setNoFollows(true);
                return;
            }
            setNumTweets(tweetsData.total);
            setTweets(tweetsData.data);
        }
    };

    useEffect(() => {
        getTweets();
    }, [currentPage]);

    const tweetItem = tweets.map((tweet) => {
        // ツイートユーザーの情報を取得
        const user = users.find((data) => data.id === tweet.user_id);
        return (
            <li key={tweet.id}>
                <div className="user__item-container">
                    <Link to={`/home/tweet/${tweet.id}`}>
                        <div className="d-flex px-2 py-4 w-100">
                            <UserIcon
                                iconData={
                                    user.profile_image_path
                                        ? user.profile_image_path
                                        : ""
                                }
                            />
                            <div className="ms-2 flex-grow-1 w-100">
                                <div className="d-flex justify-content-between">
                                    <UserName
                                        nameData={{
                                            screen_name: user.screen_name,
                                            user_name: user.user_name,
                                        }}
                                    />
                                    {/* 認証ユーザーの時のみ表示 */}
                                    {authUserId === tweet.user_id ? (
                                        <EditButtns
                                            currentText={tweet.text}
                                            tweetId={tweet.id}
                                            setCurrentPage={setCurrentPage}
                                            authUserId={authUserId}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="mt-2 w-100 new__line">
                                    <p>{tweet.text}</p>
                                    {tweet.image ? (
                                        <div className="tweet__image w-100 mt-1 border rounded">
                                            <img
                                                className="w-100 tweet__images"
                                                src={`/storage/tweet/${tweet.image}`}
                                                alt="ツイート 画像"
                                            />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </li>
        );
    });

    // １ページごとのコンテンツ数
    const contentNumPerPage = 10;
    return (
        <div
            onClick={() => console.log(users)}
            className={`mt-4 ${
                isLoading ? "is__loading" : "showing"
            } main__container`}
        >
            <div className="border">
                {nofollows ? (
                    <h2 className="py-4 px-2 fs-5">
                        まだ誰もツイートしていません。
                    </h2>
                ) : (
                    <ul>{tweetItem}</ul>
                )}
            </div>
            <Pagenation
                sum={numTweets}
                per={contentNumPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onChange={(e) => setCurrentPage(e.page)}
            />
            {isLoading ? <Loading /> : ""}
        </div>
    );
};
