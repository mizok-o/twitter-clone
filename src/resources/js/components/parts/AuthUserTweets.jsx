import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";
import { Pagenation } from "../parts/Pagenation";
import { EditButtns } from "../parts/EditButtns";

export const AuthUserTweets = (props) => {
    const { user } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [numTweets, setNumTweets] = useState(0);
    const [tweets, setTweets] = useState([]);
    const [nofollows, setNoFollows] = useState(false);

    // １ページ目のツイートを取得
    const getTweets = async () => {
        const res = await fetch("/tweets-auth-user");
        if (res.status === 200) {
            const tweetsData = await res.json();
            // ツイートが無い場合
            if (!tweetsData.total) {
                setNoFollows(true);
                return;
            }
            setTweets(tweetsData.data);
            setNumTweets(tweetsData.total);
        }
    };

    useEffect(() => {
        getTweets();
    }, [currentPage]);

    const tweetItem = tweets.map((tweet) => {
        // ツイートユーザーの情報を取得
        return (
            <li key={tweet.id}>
                <div className="user__item-container">
                    <Link to={`/home/tweet/${tweet.id}`}>
                        <div className="d-flex px-2 py-4 w-100">
                            <UserIcon iconData={user.profile_image_path} />
                            <div className="ms-2 flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <UserName
                                        nameData={{
                                            screen_name: user.screen_name,
                                            user_name: user.user_name,
                                        }}
                                    />
                                    {/* 認証ユーザーの時のみ表示 */}
                                    {user.id === tweet.user_id ? (
                                        <EditButtns
                                            currentText={tweet.text}
                                            tweetId={tweet.id}
                                            setCurrentPage={setCurrentPage}
                                            authUserId={user.id}
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
        <div className="mt-2">
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
