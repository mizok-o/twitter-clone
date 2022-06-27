import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./layout/Header";
import { UserList } from "./page/UserList";
import { TweetList } from "./page/TweetList";
import { UserProfile } from "./page/UserProfile";

import "../../css/app.css";

export const App = () => {
  //　一覧表示するユーザデータを入れる
  const [users, setUsers] = useState([]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`/`} element={<TweetList />} />
        <Route
          path="/userList"
          element={<UserList setUsers={setUsers} users={users} />}
        />
        <Route path={`/profile-:id`} element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

if (document.getElementById("example")) {
  ReactDOM.render(<App />, document.getElementById("example"));
}
