import React from 'react';

export const UserName = props => {

    return (
        <div className={`${props.userList ? "" : "mt-2"}`}>
            <p className={`lh-sm fw-bold ${props.userList ? "" : "fs-4" }`}>{props.nameData.name}</p>
            <span className='opacity-50'>＠{props.nameData.id}</span>
        </div>
    );
}
