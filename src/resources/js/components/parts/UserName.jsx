import React from "react";

export const UserName = (props) => {
    const { isUserDetail, nameData } = props;
    return (
        <div className={`${isUserDetail ? "mt-2" : ""}`}>
            <p className={`lh-sm fw-bold ${isUserDetail ? "fs-4" : ""}`}>
                {nameData.screen_name}
            </p>
            <span className="opacity-50">＠{nameData.user_name}</span>
        </div>
    );
};
