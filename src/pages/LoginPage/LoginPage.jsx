import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { loginThunk } from 'redux/authReducer';
import css from './LoginPage.module.css';

const LoginPage = () => {
  const { 
    register, 
    handleSubmit,
    reset, 
    formState: { errors } 
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = data => {
    console.log(data);
    dispatch(loginThunk(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
     <label className={css.label}>
       <span>Email:</span>
       <input {...register("email", { required: true })} type='email'/>
       {errors.email && <span>This field is required</span>}
     </label>         
     <label className={css.label}>
       <span>Password:</span>
       <input {...register("password", { required: true, minLength: 7 })} type='password'/>
       {errors.password && <span>This field is required</span>}
     </label>

     <button type="submit" className={css.class_btn}>Sign in</button>
    </form>
  );
}

export default LoginPage;
