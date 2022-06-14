import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserList } from "./page/UserList";

import "../../css/app.css";

export const App = () => {
    //　ユーザ一覧データを入れる
    const [userData, setUserData] = useState([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/userList"
                    element={
                        <UserList
                            setUserData={setUserData}
                            userData={userData}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
