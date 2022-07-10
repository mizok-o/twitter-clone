import React, { useEffect, useState } from "react";

import { UserIcon } from "../parts/UserIcon";
import { UserName } from "../parts/UserName";

export const Replies = (props) => {
    const { tweetId } = props;
    const [users, setUsers] = useState([]);
    const [replies, setReplies] = useState([]);

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

        return (
            <li key={reply.id}>
                <div className="border p-3">
                    <p>これはリプライ</p>
                    <div className="d-flex">
                        <UserIcon
                            userList={false}
                            iconData={
                                user.profile_image_path !== null
                                    ? user.profile_image_path
                                    : "default-user-icon.png"
                            }
                        />
                        <div className="ms-2 non__omit">
                            <UserName
                                isUserProfile={true}
                                nameData={{
                                    screen_name: user.screen_name,
                                    user_name: user.user_name,
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-3 w-100 new__line">
                        <p>{reply.text}</p>
                        {/* {reply.image ? (
                            <div className="reply__image w-100 mt-1 border rounded">
                                <img
                                    className="w-100 reply__images"
                                    src={`/storage/reply/${tweet.image}`}
                                    alt="ツイート 画像"
                                />
                            </div>
                        ) : (
                            ""
                        )} */}
                        {/* <p className="pt-2">投稿日: {tweet.created_at}</p> */}
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
