import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserIcon } from "../parts/UserIcon";

export const TweetPost = () => {
    const [user, setUser] = useState({});

    //　ツイート後に遷移させる用
    const navigate = useNavigate();

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const getAuthUserData = async () => {
        const res = await fetch("/authuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
        });
        if (res.status === 200) {
            const userData = await res.json();
            setUser(userData);
        }
    };

    useEffect(() => {
        getAuthUserData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // DBに登録するツイートデータ
        const tests = { text: e.target.text.value };

        //　投稿するツイートを保存して、ツイート一覧へ遷移させる
        fetch("/post-tweet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
            body: JSON.stringify(tests),
        }).then(() => navigate("/"));
    };

    return (
        <div className="container-lg my-3">
            <div className="w-100 p-3 bg-light shadow rounded">
                <div className="d-flex">
                    <UserIcon
                        userList={true}
                        iconData={{
                            icon: user.icon,
                        }}
                    />
                    <form onSubmit={(e) => handleSubmit(e)} className="ms-2">
                        <textarea
                            name="text"
                            cols="30"
                            rows="5"
                            placeholder="今日を呟こう"
                        ></textarea>
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <label>
                                <div className="tweet-form-file"></div>
                                <input
                                    className="d-none"
                                    type="file"
                                    name="example"
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
