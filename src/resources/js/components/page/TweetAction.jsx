import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { PageBackButton } from "../parts/BackToTweetList";
import { UserIcon } from "../parts/UserIcon";

/*
    TweetActionファイルでツイート更新、投稿の両方のページを表示。

    props:isEditPageは、ツイート更新ページのみ「true」がセットされる。
    isEditPageが「false」 → ツイート「投稿」ページ
    isEditPageが「true」 → ツイート「更新」ページ
*/

export const TweetAction = (props) => {
    const { isEditPage } = props;

    // ツイート「更新」ページで使用
    const { id } = useParams();
    const location = useLocation();

    const [defaultText, setDefaultText] = useState("");
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    //　ツイート後に遷移させる用
    const navigate = useNavigate();

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    // 認証ユーザー情報を取得
    const getAuthUserData = async () => {
        const res = await fetch("/auth-user");
        if (res.status === 200) {
            const userData = await res.json();
            setUser(userData.user);
        }
    };

    useEffect(() => {
        setDefaultText(isEditPage ? location.state.defaultText : "");
        getAuthUserData();
    }, []);

    // ツイート投稿もしくは更新を行う。成功の場合ツイート一覧へ遷移。エラーの場合はエラーテキストを表示。
    const postTweet = async (url, tweet) => {
        const res = await fetch(url, {
            method: isEditPage ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
            body: JSON.stringify(tweet),
        });
        if (res.status === 200) {
            navigate("/");
        } else {
            const errorMessage = await res.json();
            setErrorMessage(errorMessage.text);
        }
    };

    // ページによってurlを変更
    const setApiUrl = () => {
        if (isEditPage) {
            return `/edit-tweet/${id}`;
        }
        return "/post-tweet";
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 入力されたツイートデータ
        const tweet = {
            text: e.target.text.value,
            image: e.target.image.value,
        };

        const url = setApiUrl();
        postTweet(url, tweet);
    };

    return (
        <div className="my-3">
            <div className="w-100 p-2 bg-light shadow rounded">
                <PageBackButton />
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
                            defaultValue={isEditPage ? defaultText : ""}
                            cols="30"
                            rows="5"
                            placeholder={isEditPage ? "" : "今日を呟こう"}
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
                                className={`btn ${
                                    isEditPage ? "btn-success" : "btn-primary"
                                } mt-1`}
                                type="submit"
                            >
                                {isEditPage
                                    ? "ツイートを更新する"
                                    : "ツイートする"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
