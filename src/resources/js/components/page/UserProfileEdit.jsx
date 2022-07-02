import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PageBackButton } from "../parts/BackToTweetList";
import { UserIcon } from "../parts/UserIcon";

export const UserProfileEdit = (props) => {
    const { isEditPage, authUser } = props;

    // ツイート「更新」ページで使用
    const location = useLocation();
    const navigate = useNavigate();

    const [defaultText, setDefaultText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    useEffect(() => {
        setDefaultText(isEditPage ? location.state.defaultText : "");
    }, []);

    // ユーザー情報更新を行う。成功の場合ツイート一覧へ遷移。エラーの場合はエラーテキストを表示。

    const handleSubmit = async (e) => {
        e.preventDefault();

        const file = e.target.image.files[0];
        const screen_name = e.target.screen_name.value;
        const profile = e.target.profile.value;

        let userData = new FormData();
        userData.append("image", file, "test3.png");
        userData.append("screen_name", screen_name);
        userData.append("profile", profile);
        console.log(userData.get("screen_name"));

        const res = await fetch(`/edit-user/${authUser.id}`, {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrf_token,
            },
            body: userData,
        });
        if (res.status === 200) {
            console.log("success");
        } else {
            const errorMessage = await res.json();
            console.log(errorMessage);
            setErrorMessage(
                errorMessage.screen_name
                    ? errorMessage.screen_name
                    : "やり直してください。"
            );
        }
    };

    return (
        <div className="my-3">
            <div className="w-100 p-2 bg-light shadow rounded">
                <PageBackButton />
                <div className="d-flex">
                    <form
                        id="form"
                        method="POST"
                        encType="multipart/form-data"
                        onSubmit={(event) => handleSubmit(event)}
                        className="ms-2"
                    >
                        <div className="d-flex align-items-center">
                            <UserIcon
                                userList={true}
                                iconData={authUser.profile_image_path}
                            />
                            <label className="ms-3">
                                <div className="tweet-form-file"></div>
                                <input
                                    className="d-none"
                                    type="file"
                                    id="userImage"
                                    name="image"
                                    accept=".png, .jpeg, .jpg"
                                />
                            </label>
                        </div>
                        <div className="mt-2 mb-1 d-flex flex-column">
                            <label>ユーザーネーム</label>
                            <input type="name" name="screen_name" required />
                        </div>
                        <div className="mt-2 mb-1">
                            <label htmlFor="">プロフィールテキスト</label>
                            <textarea
                                className="p-2 w-100"
                                name="profile"
                                defaultValue={isEditPage ? defaultText : ""}
                                cols="30"
                                rows="5"
                            ></textarea>
                        </div>
                        <div>
                            <p className="api__error__message">
                                {errorMessage}
                            </p>
                        </div>
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <button
                                className="btn btn-success mt-1"
                                type="submit"
                            >
                                ユーザー情報を更新する
                            </button>
                        </div>
                    </form>
                    <div>
                        <img src="/storage/test3.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};
