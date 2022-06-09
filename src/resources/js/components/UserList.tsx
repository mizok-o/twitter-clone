import React from 'react';
import { Link } from 'react-router-dom';

import { FollowButton } from './parts/FollowButton';
import { UserIcon } from './parts/UserIcon';

import '/css/userlist.css'

export const UserList = () => {
    return (
        <div className='container-lg'>
            <h1>ユーザ一覧</h1>
            <div className='border'>
                <ul>
                    <li>
                        <Link to='#'>
                            <div className='d-flex px-2 py-3 userlist__item'>
                                <UserIcon />
                                <div className='ms-2'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <p className='lh-sm'>Mizo(テストユーザ)</p>
                                            <span className='userlist__profile__id'>＠testtest</span>
                                        </div>
                                        <div>
                                            <FollowButton />
                                        </div>
                                    </div>
                                    <div className='mt-1'>
                                        <p>私は多数あたかもその学習ようというはずのためにしですた。ついに将来に忠告らはひょろひょろその参考ですたなどをあるけれどもいでとも建設なったですから、そうにも迂ざるなかったなかっ。つまりで勧めでのはいよいよ今に何でもかでもだろだろまし。</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='#'>
                            <div className='d-flex px-2 py-3 userlist__item'>
                                <UserIcon />
                                <div className='ms-2'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <p className='lh-sm'>Mizo(テストユーザ)</p>
                                            <span className='userlist__profile__id'>＠testtest</span>
                                        </div>
                                        <div>
                                            <FollowButton />
                                        </div>
                                    </div>
                                    <div className='mt-1'>
                                        <p>私は多数あたかもその学習ようというはずのためにしですた。ついに将来に忠告らはひょろひょろその参考ですたなどをあるけれどもいでとも建設なったですから、そうにも迂ざるなかったなかっ。つまりで勧めでのはいよいよ今に何でもかでもだろだろまし。</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='#'>
                            <div className='d-flex px-2 py-3 userlist__item'>
                                <UserIcon />
                                <div className='ms-2'>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <p className='lh-sm'>Mizo(テストユーザ)</p>
                                            <span className='userlist__profile__id'>＠testtest</span>
                                        </div>
                                        <div>
                                            <FollowButton />
                                        </div>
                                    </div>
                                    <div className='mt-1'>
                                        <p>私は多数あたかもその学習ようというはずのためにしですた。ついに将来に忠告らはひょろひょろその参考ですたなどをあるけれどもいでとも建設なったですから、そうにも迂ざるなかったなかっ。つまりで勧めでのはいよいよ今に何でもかでもだろだろまし。</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
