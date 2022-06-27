import React from "react";

export const UserIcon = (props) => {
    // ユーザ詳細ページではスタイルを切り替える
    const general = {
        minWidth: 48,
        width: 48,
        height: 48,
    };
    const userDetailSize = {
        width: 80,
        height: 80,
        top: -42,
    };

    return (
        <div
            className={`${
                props.isUserDetail ? "position-absolute start-16" : ""
            }`}
            style={props.isUserDetail ? userDetailSize : general}
        >
            <div className="w-100 h-100 overflow-hidden rounded-circle border">
                <img
                    className="w-100 h-100"
                    src={`/images/${props.iconData}`}
                    alt="ユーザアイコン"
                />
            </div>
        </div>
    );
};
