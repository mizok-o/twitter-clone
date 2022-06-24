import React, { useEffect, useState, useCallback } from "react";

export const FollowNumbers = (props) => {
    // id: 表示ユーザー authUserId: ログインしているユーザー
    const { userId, isAuth } = props;

    return (
        <div className="mt-1">
            <div className="d-flex">
                <div>
                    <button className="d-flex" type="button">
                        <span className="fw-bold">100</span>
                        <p className="ms-1">フォロー</p>
                    </button>
                </div>
                <div>
                    <button className="d-flex ms-3" type="button">
                        <span className="fw-bold">110</span>
                        <p className="ms-1">フォロワー</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
