import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const TweetReply = (props) => {
    const { tweetId, replyArea } = props;

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [imageIsSelected, setImageIsSelected] = useState(false);
    const [isClicking, setIsclicking] = useState(false);

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    // ツイート投稿もしくは更新を行う。成功の場合ツイート一覧へ遷移。エラーの場合はエラーテキストを表示。
    const postReply = async (tweetData) => {
        const res = await fetch(`/reply/${tweetId}`, {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrf_token,
            },
            body: tweetData,
        });
        if (res.status === 200) {
            navigate("/home/timeline");
        } else if (res.status > 400) {
            const errorMessage = await res.json();
            setErrorMessage(errorMessage.text);
        } else {
            const errorMessage = await res.json();
            setErrorMessage(errorMessage.text);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsclicking(true);
        let tweetData = new FormData();
        const image = e.target.image.files[0];
        const text = e.target.text.value;

        // 画像が選択されてない時は追加しない
        if (image) {
            tweetData.append("image", image);
        }
        tweetData.append("text", text);

        postReply(tweetData).then(() => setIsclicking(false));
    };

    function replyTextarea(el) {
        const dummy = el.querySelector(".reply__textarea__dummy");
        el.querySelector(".reply__textarea").addEventListener("input", (e) => {
            dummy.textContent = e.target.value + "\u200b";
        });
    }

    document
        .querySelectorAll(".reply__textarea__container")
        .forEach(replyTextarea);

    return (
        <div className="my-3 main__container">
            <form
                encType="multipart/form-data"
                onSubmit={(e) => handleSubmit(e)}
                className="ms-2"
            >
                <div className="reply__textarea__container">
                    <div
                        className="reply__textarea__dummy"
                        aria-hidden="true"
                    ></div>
                    <textarea
                        id="replyTextarea"
                        className="reply__textarea"
                        name="text"
                        placeholder="返信する"
                        ref={replyArea}
                    ></textarea>
                </div>

                <div>
                    <p className="api__error__message">{errorMessage}</p>
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
                                    setImageIsSelected(e.target.files[0])
                                }
                            />
                        </label>
                        <p className="ms-2">
                            {imageIsSelected ? "画像を選択中" : "画像を選択"}
                        </p>
                    </div>
                    <button
                        className={`btn ${isClicking ? "btn-clicking" : ""}`}
                        type="submit"
                    >
                        返信する
                    </button>
                </div>
            </form>
        </div>
    );
};
