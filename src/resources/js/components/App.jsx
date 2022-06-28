import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./layout/Header";

import { TweetList } from "./page/TweetList";
import { TweetDetail } from "./page/TweetDetail";
import { TweetPost } from "./page/TweetPost";
import { TweetEdit } from "./page/TweetEdit";
import { UserList } from "./page/UserList";
import { UserProfile } from "./page/UserProfile";
import { UserEdit } from "./page/UserEdit";

import "../../css/app.css";

export const App = () => {
    const [authUserId, setAuthUserId] = useState(0);
    const getAuthUserId = async () => {
        const res = await fetch("/auth-user-id");
        if (res.status === 200) {
            const authUserId = await res.json();
            setAuthUserId(authUserId);
        }
    };

    useEffect(() => {
        console.log("getId");
        getAuthUserId();
    }, []);

    return (
        <BrowserRouter>
            <Header authUserId={authUserId} />
            <Routes>
                <Route path="/" element={<TweetList />} />
                <Route path="/tweet/:id" element={<TweetDetail />} />
                <Route path="/tweet/new" element={<TweetPost />} />
                <Route path="/tweet/edit/:id" element={<TweetEdit />} />
                <Route path="/userList" element={<UserList />} />
                <Route path="/profile/:id" element={<UserProfile />} />
                <Route path="/user/edit/" element={<UserEdit />} />
            </Routes>
        </BrowserRouter>
    );
};

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
