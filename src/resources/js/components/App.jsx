import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./layout/Header";

import { TweetList } from "./page/TweetList";
import { TweetDetail } from "./page/TweetDetail";
import { TweetAction } from "./page/TweetAction";
import { UserList } from "./page/UserList";
import { UserProfile } from "./page/UserProfile";

import "../../css/app.css";

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<TweetList />} />
                <Route path="/tweet/:id" element={<TweetDetail />} />
                <Route path="/tweet/new" element={<TweetAction />} />
                <Route path="/tweet/edit/:id" element={<TweetAction isEditPage={true} />} />
                <Route path="/userList" element={<UserList />} />
                <Route path="/profile/:id" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
};

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
