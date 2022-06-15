import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserList = (props) => {
    // ユーザ一覧をprops.userDataに入れる
    useEffect(() => {
        fetch("/users")
            .then((res) => res.json())
            .then((data) => {
                props.setUserData(data);
            });
    }, []);

    const userItem = props.userData.map((item) => {
        return (
            <li key={item.id}>
                <div className="user__item-container">
                    <Link to={`/users/${item.id}`}>
                        <div className="d-flex px-2 py-3 w-100">
                            <UserIcon
                                iconData={{
                                    icon: item.profile_image_id,
                                }}
                            />
                            <div className="ms-2 flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <UserName
                                        nameData={{
                                            name: item.screen_name,
                                            id: item.user_name,
                                        }}
                                    />
                                    <FollowButton />
                                </div>
                                <div className="mt-1">
                                    <p>{item.profile}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </li>
        );
    });

    return (
        <div className="container-lg">
            <h1>ユーザ一覧</h1>
            <div className="border">
                <ul>{userItem}</ul>
                
            </div>
        </div>
    );
};
