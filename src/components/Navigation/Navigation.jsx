import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthenticated } from 'redux/authSelectors';
import { logOutThunk } from 'redux/authReducer';
import UserMenu from 'components/UserMenu/UserMenu';
import css from "../App.module.css";

const Navigation = () => {
    const authenticated = useSelector(selectAuthenticated);
    const dispatch = useDispatch();

    const onLogOut = () => {
       dispatch(logOutThunk());
    }

  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <NavLink className={({ isActive }) => 
           `${css['header_link']} ${isActive ? css.active : ''}`} 
        to="/">Home</NavLink>
        {authenticated ? (<>
         <NavLink className={({ isActive }) => 
           `${css['header_link']} ${isActive ? css.active : ''}`}  
           to="/contacts">Contacts</NavLink>
        <UserMenu onLogOut={onLogOut} />
        </>) : <>
        <NavLink className={({ isActive }) => 
           `${css['header_link']} ${isActive ? css.active : ''}`}  
        to="/register">Register</NavLink>
        <NavLink className={({ isActive }) => 
           `${css['header_link']} ${isActive ? css.active : ''}`}  
        to="/login">Log In</NavLink>  
        </>}
      </nav>
    </header>
  )
}

export default Navigation;
