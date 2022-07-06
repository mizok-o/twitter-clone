import React, { useEffect, useState } from "react";

export const FollowButton = (props) => {
    const { userId, isFollowing, users, authUserfollows } = props;

    const [followStatus, setFollowStatus] = useState(false);
    const [isClicking, setIsclicking] = useState(false);

    useEffect(() => {
        setFollowStatus(isFollowing);
    }, [users, isFollowing]);

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
        setIsclicking(true);
        fetch(`/follow-${userId}`, options).then(() => {
            setFollowStatus(true);
            setIsclicking(false);
        });
    };

    const unfollowUser = (e) => {
        e.preventDefault();
        setIsclicking(true);
        fetch(`/unfollow-${userId}`, options).then(() => {
            setFollowStatus(false);
            setIsclicking(false);
        });
    };

    return (
        <button
            type="button"
            className={`btn btn__size ${
                followStatus ? "btn-dark" : "btn-outline-dark"
            } ${isClicking ? "btn-clicking" : ""}`}
            onClick={
                followStatus ? (e) => unfollowUser(e) : (e) => followUser(e)
            }
        >
            {followStatus ? "フォロー解除" : "フォロー"}
        </button>
    );
};
