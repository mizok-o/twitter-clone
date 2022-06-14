import React from "react";

export const UserIcon = (props) => {
    const userListSize = {
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
            className={`${props.userList ? "" : "position-absolute start-16"}`}
            style={props.userList ? userListSize : userDetailSize}
        >
            <div className="w-100 h-100 overflow-hidden rounded-circle border">
                <img
                    className="w-100 h-100"
                    src={`/images/${props.iconData.icon}`}
                    alt={props.iconData.desc}
                />
            </div>
        </div>
    );
};
