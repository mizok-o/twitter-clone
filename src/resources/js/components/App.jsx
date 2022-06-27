import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./layout/Header";
import { TweetList } from "./page/TweetList";
import { TweetDetail } from "./page/TweetDetail";
import { UserList } from "./page/UserList";
import { UserProfile } from "./page/UserProfile";

import "../../css/app.css";

export const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <TweetList
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    }
                />
                <Route path="/tweet/:id" element={<TweetDetail />} />
                <Route path="/userList" element={<UserList />} />
                <Route path="/profile/:id" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
};

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
