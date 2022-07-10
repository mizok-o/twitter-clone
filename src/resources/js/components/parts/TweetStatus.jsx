import React from "react";

export const TweetStatus = (props) => {
    const { setFavs, setReplies, replies, favs, tweetId } = props;

    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const actionFav = async () => {
        await fetch(`/fav/${tweetId}`, {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrf_token,
            },
        });
    };

    return (
        <div className="d-flex py-2">
            <div className="d-flex me-2">
                <div>返信</div>
                <div>
                    <span>{replies.length}</span>
                </div>
            </div>
            <div className="d-flex me-2">
                <div onClick={actionFav}>いいね</div>
                <div>
                    <span>{favs.length}</span>
                </div>
            </div>
            <div className="d-flex me-2">
                <div>リツイート</div>
                <div>
                    <span>0{/* {retweetsNum} */}</span>
                </div>
            </div>
        </div>
    );
};
