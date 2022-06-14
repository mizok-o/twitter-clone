import React from 'react';
import { UserIcon } from '../parts/UserIcon';

export const Tweet = () => {

    const userDataJSON = localStorage.getItem('userData')
    const userJson = JSON.parse(userDataJSON)

    return (
        <div className='container-lg'>
            <div className=''>
                <div className='w-50 p-4 bg-light shadow rounded mx-auto my-2'>
                    <div>
                        <div className='d-flex'>
                            <UserIcon userList={true} iconData={{ icon: userJson.icon, desc: userJson.iconDesc }} />
                            <form action="post" className='ms-2'>
                                <textarea name="" id="" cols="30" rows="5" placeholder='今日を呟こう'></textarea>
                                <div className='mt-1 d-flex justify-content-between align-items-center'>
                                    <label>
                                        <div className='tweet-form-file'></div>
                                        <input className='d-none' type="file" name='example' accept='.png, .jpeg, .jpg' />
                                    </label>
                                    <button className='btn btn-primary mt-1' type='button'>ツイートする</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
