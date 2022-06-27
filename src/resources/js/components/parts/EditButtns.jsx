import React from "react";

export const EditButtns = (props) => {
    const { tweetId } = props;

    // // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const editTweet = (e) => {
        e.preventDefault();
    };

    const deleteTweet = async (e) => {
        e.preventDefault();

        const checkDelete = confirm("ツイート削除しますか？");
        if (checkDelete) {
            await fetch(`/destroy-tweet/${tweetId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrf_token,
                },
            });
        }
    };

    return (
        <div className="d-flex my-1">
            <button
                type="button"
                className="btn btn-outline-dark py-0 px-2 fs-6"
                onClick={(e) => editTweet(e)}
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
