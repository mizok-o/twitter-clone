// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import UserDetail from './UserDetail';
// import UserList from './UserList';

// export const Example = () => {
//     return (
//         <BrowserRouter>
//             <h1>共通タイトル</h1>
//             <Routes>
//                 <Route path="/userList" element={<UserList />} />
//                 <Route path="/userDetail" element={<UserDetail />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }

// if (document.getElementById('example')) {
//     ReactDOM.render(<Example />, document.getElementById('example'));
// }

import React from 'react';
import ReactDOM from 'react-dom';

export const Example = () => {
    return (
        <div>
            <h1>React 表示</h1>
        </div>
    );
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
