import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./layout/Header";

import { TweetList } from "./page/TweetList";
import { TweetDetail } from "./page/TweetDetail";
import { TweetReply } from "./page/TweetReply";
import { TweetAction } from "./page/TweetAction";
import { UserList } from "./page/UserList";
import { UserProfile } from "./page/UserProfile";
import { UserProfileEdit } from "./page/UserProfileEdit";

import "../../css/app.css";
import { UserFollowsList } from "./page/UserFollowsList";
import { Loading } from "./parts/Loading";
import { TweetListOnlyFollows } from "./page/TweetListOnlyFollows";
import { NotFound } from "./page/NotFound";
import { ReplyAction } from "./page/ReplyAction";
import { ReTweetList } from "./page/ReTweetList";

export const App = () => {
    const [authUser, setAuthUser] = useState({});
    const [authUserFollows, setAuthUserFollows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 認証ユーザー情報を取得
    const getAuthUser = async () => {
        const res = await fetch("/auth-user");
        if (res.status === 200) {
            const authUser = await res.json();
            setAuthUser(authUser);
        }
    };

    // 認証ユーザーのフォローリストを取得
    const getAuthUserFollows = async () => {
        const res = await fetch("/auth-user/follows");
        if (res.status === 200) {
            const authUserFollowsList = await res.json();
            setAuthUserFollows(authUserFollowsList);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAuthUser();
        getAuthUserFollows();
    }, []);

    return (
        <BrowserRouter>
            <Header authUserId={authUser.id} />
            <Routes>
                <Route
                    path="/home/follows-timeline"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <TweetListOnlyFollows authUserId={authUser.id} />
                        )
                    }
                />
                <Route
                    path="/home/timeline"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <TweetList authUserId={authUser.id} />
                        )
                    }
                />
                <Route
                    path="/home/tweet/:id"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <TweetDetail authUserId={authUser.id} />
                        )
                    }
                />
                <Route
                    path="/home/tweet/new"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <TweetAction authUser={authUser} />
                        )
                    }
                />
                <Route
                    path="/home/reply/new"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <TweetReply authUser={authUser} />
                        )
                    }
                />
                <Route
                    path="/home/reply/edit/:id"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <ReplyAction authUser={authUser} />
                        )
                    }
                />
                <Route
                    path="/home/tweet/edit/:id"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <TweetAction
                                isEditPage={true}
                                authUser={authUser}
                            />
                        )
                    }
                />
                <Route
                    path="/home/userList"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <UserList authUserFollows={authUserFollows} />
                        )
                    }
                />
                <Route
                    path="/home/followList/:id"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <UserFollowsList
                                isFollowList={true}
                                authUserFollows={authUserFollows}
                                authUserId={authUser.id}
                            />
                        )
                    }
                />
                <Route
                    path="/home/followerList/:id"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <UserFollowsList
                                isFollowList={false}
                                authUserFollows={authUserFollows}
                                authUserId={authUser.id}
                            />
                        )
                    }
                />
                <Route
                    path="/home/profile/:id"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <UserProfile
                                authUserId={authUser.id}
                                authUserFollows={authUserFollows}
                            />
                        )
                    }
                />
                <Route
                    path="/home/profile-edit"
                    element={
                        isLoading ? (
                            <Loading />
                        ) : (
                            <UserProfileEdit authUser={authUser} />
                        )
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
