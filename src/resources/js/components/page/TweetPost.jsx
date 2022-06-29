import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserIcon } from "../parts/UserIcon";

export const TweetPost = () => {
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    //　ツイート後に遷移させる用
    const navigate = useNavigate();

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const getAuthUserData = async () => {
        const res = await fetch("/auth-user");
        if (res.status === 200) {
            const userData = await res.json();
            setUser(userData.user);
        }
    };

    useEffect(() => {
        getAuthUserData();
    }, []);

    // ツイート投稿APIを呼ぶ。エラーの場合エラーテキストをセット
    const postTweet = async (tweet) => {
        const res = await fetch("/post-tweet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
            body: JSON.stringify(tweet),
        });
        if (res.status === 401) {
            const error = await res.json();
            setErrorMessage(error.text[0]);
        } else if (res.status === 403) {
            const message = await res.json();
            setErrorMessage(message.error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // DBに登録するツイートデータ
        const tweet = {
            text: e.target.text.value,
            image: e.target.image.value,
        };
        //　投稿するツイートを保存して、ツイート一覧へ遷移させる
        postTweet(tweet);
    };

    return (
        <div className="my-3">
            <div className="w-100 p-2 bg-light shadow rounded">
                <div className="d-flex">
                    <UserIcon
                        userList={true}
                        iconData={user.profile_image_path}
                    />
                    <form
                        encType="multipart/form-data"
                        onSubmit={(e) => handleSubmit(e)}
                        className="ms-2"
                    >
                        <textarea
                            className="p-2 w-100"
                            name="text"
                            cols="30"
                            rows="5"
                            placeholder="今日を呟こう"
                        ></textarea>
                        <div>
                            <p className="api__error__message">
                                {errorMessage}
                            </p>
                        </div>
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <label>
                                <div className="tweet-form-file"></div>
                                <input
                                    className="d-none"
                                    type="file"
                                    name="image"
                                    accept=".png, .jpeg, .jpg"
                                />
                            </label>
                            <button
                                className="btn btn-primary mt-1"
                                type="submit"
                            >
                                ツイートする
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
