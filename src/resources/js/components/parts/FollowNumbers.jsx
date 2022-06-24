import React, { useEffect, useState, useCallback } from "react";

export const FollowNumbers = (props) => {
    // id: 表示ユーザー authUserId: ログインしているユーザー
    const { userId, isAuth } = props;

    const { follows, setFollows } = useState(0);
    const { followers, setFollowers } = useState(0);

    //フォロー数を取得
    const getFollowsNumber = useCallback(async () => {
        const res = await fetch(`/countFollows/${userId}`);
        if (res.status === 200) {
            const followsNum = await res.json();
            console.log(followsNum);
            setFollows(followsNum);
        }
    });

    useEffect(() => {
        console.log(userId);

        getFollowsNumber();

        const cleanup = () => {
            console.log("cleanup!");
        };
        return cleanup;
    }, []);

    // フォロワー数を取得
    // const getFollowersNumber = async () => {
    //     const res = await fetch(`/countFollowers/${userId}`);
    //     if (res.status === 200) {
    //         const followersNum = await res.json();
    //         console.log(followersNum);
    //         return followersNum;
    //     }
    // };



    return (
        <div className="mt-1">
            <div className="d-flex">
                <div>
                    <button className="d-flex" type="button">
                        <span className="fw-bold">{follows}</span>
                        <p className="ms-1">フォロー</p>
                    </button>
                </div>
                <div>
                    <button className="d-flex ms-3" type="button">
                        <span className="fw-bold">{followers}</span>
                        <p className="ms-1">フォロワー</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
