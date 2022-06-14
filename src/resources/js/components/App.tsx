import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { UserDetail } from './page/UserDetail';
import { UserList } from './page/UserList';
import { Tweet } from './page/Tweet';

import '../../css/app.css'

export const App = () => {

    const [userData, setUserData] = useState([])
    // const userlink = userData.name

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/tweet" element={<Tweet />} />
                <Route path="/userList" element={<UserList setUserData={setUserData} userData={userData} />} />
                {/* <Route
                    path={`/${userJson.name}`}
                    element={<UserDetail userData={userJson} />}
                /> */}
            </Routes>
        </BrowserRouter>
    );
}

if (document.getElementById('example')) {
    ReactDOM.render(<App />, document.getElementById('example'));
}
