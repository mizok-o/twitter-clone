import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserList } from "./page/UserList";

import "../../css/app.css";
import { Header } from "./layout/Header";
import { TweetBtn } from "./layout/TweetBtn";

export const App = () => {
    //　一覧表示するユーザデータを入れる
    const [users, setUsers] = useState([]);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/userList"
                    element={<UserList setUsers={setUsers} users={users} />}
                />
            </Routes>
            <TweetBtn />
        </BrowserRouter>
    );
};

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
