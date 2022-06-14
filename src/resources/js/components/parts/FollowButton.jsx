import React from "react";

export const FollowButton = () => {
    const userFollowed = (e) => {
        e.preventDefault();
        console.log("follow clicked!");
    };

    return (
        <button
            type="button"
            className="btn btn-outline-dark"
            onClick={(e) => userFollowed(e)}
        >
            フォロー
        </button>
    );
};
