import React from 'react';
import { Link } from 'react-router-dom';

import { FollowButton } from './parts/FollowButton';
import { UserIcon } from './parts/UserIcon';

import '/css/userlist.css'

export const UserList = props => {

    interface userArray {
        id: string,
        name: string,
        profile: string,
        image: string,
        imageDesc: string
    }

    const userData: userArray[] = [
        {
            name: 'Mizoguchi1',
            id: 'testtest',
            profile: '私は多数あたかもその学習ようというはずのためにしですた。ついに将来に忠告らはひょろひょろその参考ですたなどをあるけれどもいでとも建設なったですから、そうにも迂ざるなかったなかっ。つまりで勧めでのはいよいよ今に何でもかでもだろだろまし。',
            image: '/images/brittany-chastagnier-B7xSl-dWuto-unsplash.jpg',
            imageDesc: 'ユーザアイコン',
        },
        {
            name: 'Mizoguchi2',
            id: 'testtest',
            profile: '私は多数あたかもその学習ようというはずのためにしですた。ついに将来に忠告らはひょろひょろその参考ですたなどをあるけれどもいでとも建設なったですから、そうにも迂ざるなかったなかっ。つまりで勧めでのはいよいよ今に何でもかでもだろだろまし。',
            image: '/images/brittany-chastagnier-B7xSl-dWuto-unsplash.jpg',
            imageDesc: 'ユーザアイコン',
        },
        {
            name: 'Mizoguchi3',
            id: 'testtest',
            profile: '私は多数あたかもその学習ようというはずのためにしですた。ついに将来に忠告らはひょろひょろその参考ですたなどをあるけれどもいでとも建設なったですから、そうにも迂ざるなかったなかっ。つまりで勧めでのはいよいよ今に何でもかでもだろだろまし。',
            image: '/images/brittany-chastagnier-B7xSl-dWuto-unsplash.jpg',
            imageDesc: 'ユーザアイコン',
        },
    ]

    const getUserInfo = item => {
        props.setUserData(item)
        localStorage.setItem('userData', JSON.stringify(item))
        console.log(localStorage.getItem('userData'));
    }

    const userItem = userData.map((item, i) => {
        return (
            <li key={i}>
                <Link to='/userDetail' onClick={() => getUserInfo(item)}>
                    <div className='d-flex px-2 py-3 userlist__item'>
                        <UserIcon data={{ image: item.image, desc: item.imageDesc }} />
                        <div className='ms-2'>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <p className='lh-sm'>{item.name}</p>
                                    <span className='userlist__profile__id'>＠{item.id}</span>
                                </div>
                                <div>
                                    <FollowButton />
                                </div>
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
