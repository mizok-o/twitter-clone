import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserList } from "./page/UserList";

import "../../css/app.css";

export const App = () => {
    //　一覧表示するユーザデータを入れる
    const [users, setUsers] = useState([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/userList"
                    element={<UserList setUsers={setUsers} users={users} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
