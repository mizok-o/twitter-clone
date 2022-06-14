import React from "react";

export const FollowButton = () => {
    const followBtnClicked = () => {
        console.log("follow clicked!");
    };

    return (
        <button
            type="button"
            className="btn btn-outline-dark user__btn__follow"
            onClick={() => followBtnClicked()}
        >
            フォロー
        </button>
    );
};
