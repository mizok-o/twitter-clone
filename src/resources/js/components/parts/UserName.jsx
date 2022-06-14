import React from "react";

export const UserName = (props) => {
    return (
        <div className={`${props.isUserDetail ? "mt-2" : ""}`}>
            <p className={`lh-sm fw-bold ${props.isUserDetail ? "fs-4" : ""}`}>
                {props.nameData.name}
            </p>
            <span className="opacity-50">＠{props.nameData.id}</span>
        </div>
    );
};
