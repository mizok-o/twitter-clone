import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./layout/Header";

import { TweetList } from "./page/TweetList";
import { TweetDetail } from "./page/TweetDetail";
import { TweetAction } from "./page/TweetAction";
import { UserList } from "./page/UserList";
import { UserProfile } from "./page/UserProfile";
import { UserProfileEdit } from "./page/UserProfileEdit";

import "../../css/app.css";

export const App = () => {
    const [authUser, setAuthUser] = useState({});

    // 認証ユーザー情報を取得
    const getAuthUser = async () => {
        const res = await fetch("/auth-user");
        if (res.status === 200) {
            const authUser = await res.json();
            setAuthUser(authUser);
        }
    };

    useEffect(() => {
        getAuthUser();
    }, []);

    return (
        <BrowserRouter>
            <Header authUserId={authUser.id} />
            <Routes>
                <Route
                    path="/home/timeline"
                    element={<TweetList authUserId={authUser.id} />}
                />
                <Route path="/home/tweet/:id" element={<TweetDetail />} />
                <Route
                    path="/home/tweet/new"
                    element={<TweetAction authUser={authUser} />}
                />
                <Route
                    path="/home/tweet/edit/:id"
                    element={
                        <TweetAction isEditPage={true} authUser={authUser} />
                    }
                />
                <Route path="/home/userList" element={<UserList />} />
                <Route
                    path="/home/profile/:id"
                    element={<UserProfile authUserId={authUser.id} />}
                />
                <Route
                    path="/home/profile-edit"
                    element={<UserProfileEdit authUser={authUser} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
