import React from "react";

export const UserName = (props) => {
    const { isUserDetail, nameData } = props;
    return (
        <div className={`omit__text__container ${isUserDetail ? "mt-2" : ""}`}>
            <p
                className={`lh-sm fw-bold ${
                    isUserDetail ? "fs-4" : ""
                } omit__text`}
            >
                {nameData.screen_name}
            </p>
            <p className="opacity-50 omit__text">＠{nameData.user_name}</p>
        </div>
    );
};
