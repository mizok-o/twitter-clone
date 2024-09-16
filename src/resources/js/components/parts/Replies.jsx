import React, { useEffect, useState } from "react";

import { UserIcon } from "./UserIcon";
import { UserName } from "./UserName";
import { EditButtns } from "./EditButtns";

export const Replies = (props) => {
    const { tweetId, authUserId, userName } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [replies, setReplies] = useState([]);

    // 日付データをyy/mm/ddに加工
    const editPostedDate = (dateData) => {
        return dateData.split("T")[0].replace(/-/g, "/");
    };

    const getReplyAndUsers = async () => {
        const usersRes = await fetch("/users-all");
        if (usersRes.status === 200) {
            const usersData = await usersRes.json();
            setUsers(usersData);
        }

        const replysRes = await fetch(`/replys/${tweetId}`);
        if (replysRes.status === 200) {
            const replyData = await replysRes.json();
            setReplies(replyData);
        }
    };

    useEffect(() => {
        getReplyAndUsers();
    }, []);

    const reply = replies.map((reply) => {
        const user = users.find((e) => e.id === reply.user_id);
        const replyDate = editPostedDate(reply.created_at);

        return (
            <li key={reply.id}>
                <div className="mb-4">
                    <p>返信先: @{userName}</p>
                    <div className="d-flex">
                        <UserIcon
                            userList={false}
                            iconData={
                                user.profile_image_path !== null
                                    ? user.profile_image_path
                                    : "default-user-icon.png"
                            }
                        />
                        <div className="flex-grow-1 w-100">
                            <div className="d-flex justify-content-between">
                                <div className="ms-2">
                                    <UserName
                                        isUserProfile={true}
                                        nameData={{
                                            screen_name: user.screen_name,
                                            user_name: user.user_name,
                                        }}
                                    />
                                </div>
                                {authUserId === reply.user_id ? (
                                    <EditButtns
                                        currentText={reply.text}
                                        contentId={reply.id}
                                        setCurrentPage={setCurrentPage}
                                        authUserId={authUserId}
                                        isReply={true}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 w-100 new__line">
                        <p>{reply.text}</p>
                        {reply.image ? (
                            <div className="reply__image w-100 mt-1 border rounded">
                                <img
                                    className="w-100 reply__images"
                                    src={`/storage/reply/${reply.image}`}
                                    alt="リプライ 画像"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <p className="pt-1 fs-6">投稿日: {replyDate}</p>
                    </div>
                </div>
            </li>
        );
    });

    return (
        <div className="">
            <ul>{reply}</ul>
        </div>
    );
};
