import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserList } from "./page/UserList";
import { TweetList } from "./page/TweetList";

import "../../css/app.css";
import { Header } from "./layout/Header";
import { TweetBtn } from "./layout/TweetBtn";

export const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/userList" element={<UserList />} />
                <Route path="/" element={<TweetList />} />
            </Routes>
            <TweetBtn />
        </BrowserRouter>
    );
};

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
