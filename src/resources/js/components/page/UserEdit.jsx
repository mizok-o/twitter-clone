import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageBackButton } from "../parts/PageBackButton";

export const UserEdit = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const getAuthUserData = async () => {
        const res = await fetch("/auth-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
        });
        if (res.status === 200) {
            const userData = await res.json();
            setUser(userData.user);
        }
    };

    useEffect(() => {
        getAuthUserData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 更新するユーザーデータ
        const userProfile = {
            screen_name: e.target.screen_name.value,
            profile: e.target.profile.value,
        };

        //　ユーザー情報を更新する
        fetch(`/edit-user/${user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
            body: JSON.stringify(userProfile),
        });
        // .then(() => navigate("/"));
    };

    return (
        <div className="my-3">
            <div className="w-100 p-2 bg-light shadow rounded">
                <PageBackButton />
                <div className="d-flex">
                    <form
                        encType="multipart/form-data"
                        onSubmit={(e) => handleSubmit(e)}
                        className="ms-2"
                    >
                        <input
                            type="name"
                            name="screen_name"
                            placeholder="名前"
                            defaultValue={user.screen_name}
                        />
                        <textarea
                            className="p-2 w-100 mt-2"
                            name="profile"
                            defaultValue={user.profile}
                            cols="20"
                            rows="5"
                        ></textarea>
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
                                className="btn btn-success mt-1"
                                type="submit"
                            >
                                プロフィールを更新する
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
