import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Replies } from "../parts/Replies";
import { TweetStatus } from "../parts/TweetStatus";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";
import { TweetReply } from "./TweetReply";

export const TweetDetail = (props) => {
    const { authUserId } = props;
    const [tweet, setTweet] = useState({});
    const [user, setUser] = useState({});
    const [favs, setFavs] = useState([]);
    const [replies, setReplies] = useState([]);
    const [isFav, setIsFav] = useState(false);

    // urlからツイートIDの取得
    const { id } = useParams();
    // リプライ投稿テキストエリアを取得
    const replyArea = useRef(null);

    // 指定のツイートを取得
    const getTweet = async () => {
        const res = await fetch(`/tweets/${id}`);
        if (res.status === 200) {
            const tweetData = await res.json();
            return tweetData;
        }
    };

    // 指定のツイートのいいねを取得
    const getReplies = async () => {
        const res = await fetch(`/replys/${id}`);
        if (res.status === 200) {
            const repliesData = await res.json();
            if (!repliesData) {
                return;
            }
            setReplies(repliesData);
        }
    };

    // ツイート主のユーザー情報をuserにセット
    const getUserData = async (userId) => {
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

            getUserData(tweetData.user_id);
        });
        getReplies();
    }, []);

    // 指定のツイートのいいねを取得
    const getFavs = async () => {
        const res = await fetch(`/favs/${id}`);
        if (res.status === 200) {
            const favsData = await res.json();
            if (!favsData) {
                return;
            }
            console.log(favsData);
            setFavs(favsData);
        }
    };

    useEffect(() => {
        getFavs();
    }, [isFav]);

    return (
        <div className="mt-5 main__container">
            <div className="border">
                <div className="d-flex align-items-center">
                    <Link to="/home/timeline">
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
                    <Link
                        to={`/home/profile/${user.id}`}
                        className="d-flex align-items-center"
                    >
                        <UserIcon
                            userList={false}
                            iconData={
                                user.profile_image_path !== null
                                    ? user.profile_image_path
                                    : "default-user-icon.png"
                            }
                        />
                        <div className="ms-2 non__omit">
                            <UserName
                                isUserProfile={true}
                                nameData={{
                                    screen_name: user.screen_name,
                                    user_name: user.user_name,
                                }}
                            />
                        </div>
                    </Link>
                    <div className="mt-3 w-100 new__line">
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
                        <TweetStatus
                            setIsFav={setIsFav}
                            isFav={isFav}
                            replies={replies}
                            favs={favs}
                            tweetId={id}
                            authUserId={authUserId}
                            isEditable={true}
                            replyArea={replyArea}
                        />
                        <p className="pt-2">投稿日: {tweet.created_at}</p>
                    </div>
                    <Replies tweetId={id} authUserId={authUserId} />
                    <div>
                        <TweetReply tweetId={id} replyArea={replyArea} />
                        {/* <Link to={"/home/reply/new"}>
                            <button className="btn">返信する</button>
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
