import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";
import { Pagenation } from "../parts/Pagenation";
import { EditButtns } from "../parts/EditButtns";

export const TweetList = (props) => {
    const { authUserId } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [numTweets, setNumTweets] = useState(0);
    const [tweets, setTweets] = useState([]);
    const [nofollows, setNoFollows] = useState(false);

    // １ページ目のツイートを取得
    const getTweets = async () => {
        const res = await fetch(`/tweets?page=${currentPage}`);
        if (res.status === 200) {
            const tweetsData = await res.json();
            // ツイートが無い場合
            if (!tweetsData.tweets.total) {
                setNoFollows(true);
                return;
            }
            setUsers(tweetsData.users);
            setNumTweets(tweetsData.tweets.total);
            setTweets(tweetsData.tweets.data);
        }
    };

    useEffect(() => {
        getTweets();
    }, [currentPage]);

    const tweetItem = tweets.map((tweet) => {
        // ツイートユーザーの情報を取得
        const userData = users.find((data) => data.id === tweet.user_id);
        return (
            <li key={tweet.id}>
                <div className="user__item-container">
                    <Link to={`/home/tweet/${tweet.id}`}>
                        <div className="d-flex px-2 py-4 w-100">
                            <UserIcon iconData={userData.profile_image_path} />
                            <div className="ms-2 flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <UserName
                                        nameData={{
                                            screen_name: userData.screen_name,
                                            user_name: userData.user_name,
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
                                <div className="mt-2">
                                    <div>
                                        <p>{tweet.text}</p>
                                    </div>

                                    {tweet.image ? (
                                        <div className="w-100 mt-1 border rounded">
                                            <img
                                                className="w-100"
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
        <div className="mt-4">
            <div className="border">
                {nofollows ? (
                    <h2 className="py-4 px-2 fs-5">
                        フォローした人のツイートがここに表示されます。
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
        </div>
    );
};
