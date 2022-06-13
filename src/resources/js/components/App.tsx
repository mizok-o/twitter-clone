import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { UserDetail } from './UserDetail';
import { UserList } from './UserList';
import { Tweet } from './Tweet';

import '../../css/app.css'

export const App = () => {

    const [userData, setUserData] = useState<object>({})
    // const userlink = userData.name
    const userDataJSON = localStorage.getItem('userData')
    const userJson = JSON.parse(userDataJSON)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/tweet" element={<Tweet />} />
                <Route path="/userList" element={<UserList setUserData={setUserData} />} />
                <Route
                    path={`/${userJson.name}`}
                    element={<UserDetail userData={userJson} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

if (document.getElementById('example')) {
    ReactDOM.render(<App />, document.getElementById('example'));
}
