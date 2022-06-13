import React from 'react';
import { Link } from 'react-router-dom';

import { FollowButton } from './parts/FollowButton';
import { UserIcon } from './parts/UserIcon';
import { UserName } from './parts/UserName';

import '/css/userlist.css'

export const UserList = props => {
    interface userArray {
        id: string,
        name: string,
        profile: string,
        icon: string,
        iconDesc: string
    }

    const userData: userArray[] = [
        {
            name: 'Mizoguchi1',
            id: 'testtest',
            profile: '私は多数あたかもその学習ようというはずのためにしですた。ついに将来に忠告らはひょろひょろその参考ですたなどをあるけれどもいでとも建設なったですから、そうにも迂ざるなかったなかっ。つまりで勧めでのはいよいよ今に何でもかでもだろだろまし。',
            icon: '/images/brittany-chastagnier-B7xSl-dWuto-unsplash.jpg',
            iconDesc: 'ユーザアイコン',
        },
        {
            name: 'Mizoguchi2',
            id: 'testtest',
            profile: '私は多数あたかもその学習ようというはずのためにしですた。ついに将来に忠告らはひょろひょろその参考ですたなどをあるけれどもいでとも建設なったですから、そうにも迂ざるなかったなかっ。つまりで勧めでのはいよいよ今に何でもかでもだろだろまし。',
            icon: '/images/brittany-chastagnier-B7xSl-dWuto-unsplash.jpg',
            iconDesc: 'ユーザアイコン',
        },
        {
            name: 'Mizoguchi3',
            id: 'testtest',
            profile: '私は多数あたかもその学習ようというはずのためにしですた。ついに将来に忠告らはひょろひょろその参考ですたなどをあるけれどもいでとも建設なったですから、そうにも迂ざるなかったなかっ。つまりで勧めでのはいよいよ今に何でもかでもだろだろまし。',
            icon: '/images/brittany-chastagnier-B7xSl-dWuto-unsplash.jpg',
            iconDesc: 'ユーザアイコン',
        },
    ]

    const getUserInfo = item => {
        localStorage.setItem('userData', JSON.stringify(item))
        props.setUserData(item)
    }

    const userItem = userData.map((item, i) => {
        return (
            <li key={i}>
                <Link to={`/${item.name}`} onClick={() => getUserInfo(item)}>
                    <div className='d-flex px-2 py-3 userlist__item'>
                        <UserIcon userList={true} iconData={{ icon: item.icon, desc: item.iconDesc }} />
                        <div className='ms-2'>
                            <div className='d-flex justify-content-between'>
                                <UserName userList={true}  nameData={{ name: item.name, id: item.id }} />
                                <FollowButton />
                            </div>
                            <div className='mt-1'>
                                <p>{item.profile}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </li>
        )
    })

    return (
        <div className='container-lg'>
            <h1>ユーザ一覧</h1>
            <div className='border'>
                <ul>
                    {userItem}
                </ul>
            </div>
        </div>
    );
}
