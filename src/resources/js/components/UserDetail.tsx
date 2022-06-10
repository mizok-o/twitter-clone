import React from 'react';

export const UserDetail = props => {

    const userDataJSON = localStorage.getItem('userData')
    const userData = JSON.parse(userDataJSON)

    return (
        <div className='container-lg'>
            <div className='border'>
                <div className='d-flex'>
                    <div>
                        <button className='btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#111111" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg>
                        </button>
                    </div>
                    <div className='me-3'>
                        <h2>{userData.name}</h2>
                    </div>
                </div>
                <div className=''>
                    {/* <img src="" alt="" /> */}
                    <div className='w-100 bg-primary'></div>
                </div>
                <div>画像とフォローボタ</div>
                <div>
                    <div>
                        名前とID
                    </div>
                    <div>
                        プロフィール
                    </div>
                </div>
                <div>フォロー・フォロワー</div>
            </div>
            <div>ツイート</div>
        </div>
    );
}
