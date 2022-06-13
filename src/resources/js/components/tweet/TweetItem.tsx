// import React from 'react';
// import { Link } from 'react-router-dom';

// import { UserIcon } from '../parts/UserIcon';
// import { UserName } from '../parts/UserName';

// export const TweetItem = props => {

//   const getUserInfo = item => {
//     localStorage.setItem('userData', JSON.stringify(item))
//   }

//   const tweets = userData.map((item, i) => {

//     return (
//         <li key={i}>
//             <Link to={`/${item.name}`} onClick={() => getUserInfo(item)}>
//               <div className='d-flex px-2 py-3 userlist__item'>
//                   <UserIcon userList={true} iconData={{ icon: item.icon, desc: item.iconDesc }} />
//                   <div className='ms-2'>
//                       <UserName userList={true}  nameData={{ name: item.name, id: item.id }} />
//                       <div className='mt-1'>
//                           <p>{item.profile}</p>
//                       </div>
//                   </div>
//               </div>
//             </Link>
//         </li>
//     )
// })

//   return (
//       <>
//         {tweets}
//       </>
//   );
// }
