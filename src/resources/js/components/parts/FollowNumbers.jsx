import React, { useEffect, useState } from "react";

export const FollowNumbers = (props) => {
    // 表示したいユーザーのID
    const { userId } = props;

    const [followsNum, setFollowsNum] = useState(0);
    const [followersNum, setFollowersNum] = useState(0);

    //フォロー数を取得
    const getFollowsNumber = async () => {
        const res = await fetch(`/count-follows/${userId}`);
        if (res.status === 200) {
            const follows = await res.json();
            setFollowsNum(follows);
        }
    };

    // フォロワー数を取得
    const getFollowersNumber = async () => {
        const res = await fetch(`/count-followers/${userId}`);
        if (res.status === 200) {
            const followers = await res.json();
            setFollowersNum(followers);
        }
    };

    useEffect(() => {
        getFollowsNumber();
        getFollowersNumber();
    }, []);

    return (
        <div className="mt-1">
            <div className="d-flex">
                <div>
                    <button className="d-flex" type="button">
                        <span className="fw-bold">{followsNum}</span>
                        <p className="ms-1">フォロー</p>
                    </button>
                </div>
                <div>
                    <button className="d-flex ms-3" type="button">
                        <span className="fw-bold">{followersNum}</span>
                        <p className="ms-1">フォロワー</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
