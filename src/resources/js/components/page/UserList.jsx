import React, { useEffect } from "react";

import { FollowButton } from "../parts/FollowButton";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserList = (props) => {
    // ユーザ一覧を配列として取得して格納
    useEffect(() => {
        fetch("/users")
            .then((res) => res.json())
            .then((data) => {
                props.setUserData(data);
            });
    }, []);

    const userItemClicked = () => {
        console.log("clicked");
    };

    const userItem = props.userData.map((item, i) => {
        return (
            <li key={i}>
                <div className="user__item" onClick={() => userItemClicked()}>
                    <div className="d-flex px-2 py-3 w-100">
                        <UserIcon
                            userList={true}
                            iconData={{
                                icon: item.profile_image_id,
                                desc: item.iconDesc,
                            }}
                        />
                        <div className="ms-2 flex-grow-1">
                            <div className="d-flex justify-content-between">
                                <UserName
                                    userList={true}
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
