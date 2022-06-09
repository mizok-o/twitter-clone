import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserDetail from './UserDetail';
import UserList from './UserList';

function Example() {
    return (
        <BrowserRouter>
            <h1>共通トル</h1>
            <Routes>
                <Route path="/userList" element={<UserList />} />
                <Route path="/userDetail" element={<UserDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
