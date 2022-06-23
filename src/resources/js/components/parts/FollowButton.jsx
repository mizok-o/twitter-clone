import React, { useEffect, useState } from "react";

export const FollowButton = (props) => {
    const { userId, isFollowing, users, authUserfollows } = props;

    const [followStatus, setFollowStatus] = useState(false);

    useEffect(() => {
        // console.log("isFollowing");
        // console.log(isFollowing);
        setFollowStatus(isFollowing);
    }, [users, authUserfollows]);

    // csrf対策のため、トークンを取得
    const csrf_token = document.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf_token,
        },
    };

    const followUser = (e) => {
        e.preventDefault();
        fetch(`/follow/${userId}`, options).then(() => {
            setFollowStatus(true);
        });
    };

    const unfollowUser = (e) => {
        e.preventDefault();
        fetch(`/unfollow/${userId}`, options).then(() =>
            setFollowStatus(false)
        );
    };

    return (
        <>
            <button
                type="button"
                className={`btn ${
                    followStatus ? "btn-dark" : "btn-outline-dark"
                }`}
                onClick={
                    followStatus ? (e) => unfollowUser(e) : (e) => followUser(e)
                }
            >
                {followStatus ? "フォロー解除" : "フォロー"}
            </button>
        </>
    );
};
