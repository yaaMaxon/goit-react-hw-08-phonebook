import React from 'react'
import { useSelector } from 'react-redux';
import { selectAuthUserData } from 'redux/authSelectors';
import css from './UserMenu.module.css';

const UserMenu = ({ onLogOut }) => {
    const userEmail = useSelector(selectAuthUserData);
  return (
 <div className={css.menu_container}>
   <p className={css.email}>{userEmail.email}</p>
   <button onClick={onLogOut} className={css.logout_btn}>
    Logout
   </button>
 </div>
  )
}

export default UserMenu;