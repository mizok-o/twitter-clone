import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { PageBackButton } from "../parts/PageBackButton";
import { UserIcon } from "../parts/UserIcon";

/*
    TweetActionファイルでツイート更新、投稿の両方のページを表示。

    props:isEditPageは、ツイート更新ページのみ「true」がセットされる。
    isEditPageが「false」 → ツイート「投稿」ページ
    isEditPageが「true」 → ツイート「更新」ページ
*/

export const TweetAction = (props) => {
    const { isEditPage, authUser } = props;

    // ツイート「更新」ページで使用
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [defaultText, setDefaultText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [imageIsSelected, setImageIsSelected] = useState(false);

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    useEffect(() => {
        setDefaultText(isEditPage ? location.state.defaultText : "");
    }, []);

    // ツイート投稿もしくは更新を行う。成功の場合ツイート一覧へ遷移。エラーの場合はエラーテキストを表示。
    const postTweet = async (url, tweetData) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrf_token,
            },
            body: tweetData,
        });
        if (res.status === 200) {
            navigate("/home/timeline");
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

        // postするツイート作成
        let tweetData = new FormData();
        const image = e.target.image.files[0];
        const text = e.target.text.value;

        // 画像が選択されてない時は追加しない
        if (image) {
            tweetData.append("image", image);
        }
        tweetData.append("text", text);

        postTweet(setApiUrl(), tweetData);
    };

    return (
        <div className="my-3 main__container">
            <div className="w-100 p-2 bg-light shadow rounded">
                <PageBackButton />
                <div className="d-flex justify-content-center">
                    <UserIcon
                        userList={true}
                        iconData={
                            authUser.profile_image_path !== null
                                ? authUser.profile_image_path
                                : "default-user-icon.png"
                        }
                    />
                    <form
                        encType="multipart/form-data"
                        onSubmit={(e) => handleSubmit(e)}
                        className="ms-2"
                    >
                        <textarea
                            className="p-2 w-100"
                            name="text"
                            required
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
                            <div className="d-flex select__image__area">
                                <label>
                                    <div className="tweet-form-file"></div>
                                    <input
                                        id="userImage"
                                        className="d-none"
                                        type="file"
                                        name="image"
                                        accept=".png, .jpeg, .jpg, .webp"
                                        onChange={(e) =>
                                            setImageIsSelected(
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                </label>
                                <p className="ms-2">
                                    {imageIsSelected
                                        ? "画像を選択中"
                                        : "画像を選択"}
                                </p>
                            </div>
                            <button
                                className={`btn ${
                                    isEditPage ? "btn-success" : "btn-primary"
                                }`}
                                type="submit"
                            >
                                {isEditPage ? "ツイートを更新" : "ツイート"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
