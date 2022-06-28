import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { UserIcon } from "../parts/UserIcon";
import { PageBackButton } from "../parts/PageBackButton";

export const TweetEdit = () => {
    //　ツイート後に遷移させる用
    const location = useLocation();
    const [defaultText] = useState(location.state.defaultText);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    // urlからツイートIDの取得
    const { id } = useParams();

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
        // DBに更新するツイートデータ
        const tests = {
            text: e.target.text.value,
            image: e.target.image.value,
        };

        //　ツイートを更新して、ツイート一覧へ遷移させる
        fetch(`/edit-tweet/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
            body: JSON.stringify(tests),
        }).then(() => navigate("/"));
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
                            defaultValue={defaultText}
                            cols="30"
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
                                ツイートを更新する
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
