import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { Pagenation } from "../parts/Pagenation";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserList = (props) => {
    const { authUserFollows } = props;
    const [users, setUsers] = useState([]);
    const [numUsers, setNumUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // １ページ目の情報取得
    const getUserList = async () => {
        const res = await fetch(`/users?page=${currentPage}`);
        if (res.status === 200) {
            const userList = await res.json();
            return userList;
        }
    };
    // 認証ユーザーにフォローされているかをユーザー一覧に付与
    const addIsFollowing = (users) => {
        const usersData = users.map((user) => {
            return {
                ...user,
                is_following: authUserFollows.includes(user.id),
            };
        });
        setUsers(usersData);
    };

    //１ページ目に表示するデータにフォロー状態を付与して返す
    useEffect(() => {
        getUserList().then((userList) => {
            // ページネーション用に表示する全ユーザー数をセット
            setNumUsers(userList.numUsers);
            addIsFollowing(userList.users.data);
        });
    }, [authUserFollows, currentPage]);

    const userItem = users.map((item) => {
        return (
            <li key={item.id}>
                <div className="user__item-container">
                    <Link to={`/home/profile/${item.id}`}>
                        <div className="d-flex px-2 py-4 w-100">
                            <UserIcon iconData={item.profile_image_path} />
                            <div className="ms-2 flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <UserName
                                        nameData={{
                                            screen_name: item.screen_name,
                                            user_name: item.user_name,
                                        }}
                                    />
                                    <FollowButton
                                        userId={item.id}
                                        isFollowing={item.is_following}
                                        users={users}
                                        authUserFollows={authUserFollows}
                                    />
                                </div>
                                <div className="mt-2">
                                    <p>{item.profile}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </li>
        );
    });

    // １ページごとのコンテンツ数
    const contentNumPerPage = 10;
    return (
        <div className="mt-4 main__container">
            <div className="border">
                <ul>{userItem}</ul>
            </div>
            <Pagenation
                sum={numUsers}
                per={contentNumPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onChange={(e) => setCurrentPage(e.page)}
            />
        </div>
    );
};
