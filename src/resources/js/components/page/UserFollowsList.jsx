import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FollowButton } from "../parts/FollowButton";
import { PageBackButton } from "../parts/PageBackButton";
import { Pagenation } from "../parts/Pagenation";
import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const UserFollowsList = (props) => {
    const { isFollowList, authUserFollows, authUserId } = props;

    const [users, setUsers] = useState([]);
    const [numUsers, setNumUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const { id } = useParams();

    // フォローの取得
    const getFollowUsersList = async () => {
        const res = await fetch(`/users-follows/${id}?page=${currentPage}`);
        if (res.status === 200) {
            const followUsersData = await res.json();
            setNumUsers(followUsersData.total);
            addIsFollowing(followUsersData.data);
        }
    };

    // フォロワーの取得
    const getFollowerUsersList = async () => {
        const res = await fetch(`/users-followers/${id}?page=${currentPage}`);
        if (res.status === 200) {
            const followUsersData = await res.json();
            setNumUsers(followUsersData.total);
            addIsFollowing(followUsersData.data);
        }
    };

    // フォローかフォロワーか判定して、ユーザーリストをセット
    useEffect(() => {
        if (!authUserFollows) return;
        if (isFollowList) {
            getFollowUsersList();
        } else {
            getFollowerUsersList();
        }
    }, [currentPage, authUserFollows]);

    // フォローされているかをユーザー一覧に付与する
    const addIsFollowing = (followUsersData) => {
        const followUsers = followUsersData.map((user) => {
            return {
                ...user,
                is_following: isFollowList
                    ? true
                    : authUserFollows.includes(Number(user.id)),
            };
        });
        setUsers(followUsers);
    };

    const userItem = users.map((user) => {
        return (
            <li key={user.id}>
                <div className="user__item-container">
                    <Link to={`/home/profile/${user.id}`}>
                        <div className="d-flex px-2 py-4 w-100">
                            <UserIcon iconData={user.profile_image_path} />
                            <div className="ms-2 flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <UserName
                                        nameData={{
                                            screen_name: user.screen_name,
                                            user_name: user.user_name,
                                        }}
                                    />
                                    <FollowButton
                                        userId={user.id}
                                        isFollowing={user.is_following}
                                        users={users}
                                    />
                                </div>
                                <div className="mt-2">
                                    <p>{user.profile}</p>
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
                <PageBackButton isProfile={true} authUserId={authUserId} />
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
