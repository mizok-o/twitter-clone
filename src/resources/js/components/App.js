import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return(
        <p>テスト用</p>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
