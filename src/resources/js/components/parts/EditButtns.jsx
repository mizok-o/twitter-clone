import React from "react";
import { useNavigate } from "react-router-dom";

export const EditButtns = (props) => {
    const { tweetId, currentText, setCurrentPage, authUserId } = props;

    const navigate = useNavigate();

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const moveEditPage = (e) => {
        e.preventDefault();
        navigate(`/home/tweet/edit/${tweetId}`, {
            state: { defaultText: currentText },
        });
    };

    const deleteTweet = async (e) => {
        e.preventDefault();

        const checkDelete = confirm("ツイート削除しますか？");
        if (checkDelete) {
            const res = await fetch(`/destroy-tweet/${tweetId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrf_token,
                },
            });
            if (res.status === 200) {
                setCurrentPage(1);
                navigate(`/home/profile/${authUserId}`);
            }
        }
    };

    return (
        <div className="d-flex my-1">
            <button
                type="button"
                className="btn btn-outline-dark py-0 px-2 fs-6"
                onClick={(e) => moveEditPage(e)}
            >
                更新
            </button>
            <button
                type="button"
                className="btn btn-danger py-0 px-2 fs-6 ms-1"
                onClick={(e) => deleteTweet(e)}
            >
                削除
            </button>
        </div>
    );
};
