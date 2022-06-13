import React from 'react';
import { Link } from 'react-router-dom';

import { FollowButton } from './parts/FollowButton';
import { UserIcon } from './parts/UserIcon';
import { UserName } from './parts/UserName';
import { TweetItem } from './tweet/tweetItem';

export const UserDetail = props => {

    const userDataJSON = localStorage.getItem('userData')
    const userData = JSON.parse(userDataJSON)
    // const userData = props.userData

    return (
        <div className='container-lg'>
            <div className='border'>
                <div>
                    <div className='d-flex p-1'>
                        <Link to='/userlist'>
                            <button className='btn'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#111111" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>
                            </button>
                        </Link>
                        <div className='me-3'>
                            <h2>{userData.name}</h2>
                        </div>
                    </div>
                    <div>
                        <img className='w-100 bg-primary' style={{ height: '160px' }} src="/images/twitter-cover-example.png" alt="" />
                    </div>
                </div>
                <div className='p-3'>
                    <div className='position-relative'>
                        <div className='w-100 d-flex justify-content-end'>
                            <FollowButton />
                        </div>
                        <UserIcon userList={false} iconData={{ icon: userData.icon, desc: userData.iconDesc }} />
                    </div>
                    <div>
                        <UserName userList={false} nameData={{ name: userData.name, id: userData.id }} />
                        <div className='mt-1'>
                            <p>{userData.profile}</p>
                        </div>
                    </div>
                    <div className='mt-1'>
                        <div className='d-flex'>
                            <div>
                                <button className='d-flex' type='button'>
                                    <span className='fw-bold'>100</span>
                                    <p className='ms-1'>フォロー</p>
                                </button>
                            </div>
                            <div>
                                <button className='d-flex ms-3' type='button'>
                                    <span className='fw-bold'>110</span>
                                    <p className='ms-1'>フォロワー</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border'>
                <p>ツイート一覧</p>
            </div>
        </div>
    );
}
