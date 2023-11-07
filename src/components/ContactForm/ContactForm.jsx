import React, { useState } from 'react';
import { nanoid } from "nanoid";
import css from './ContactForm.module.css';

export const ContactForm = ({ handleAddInf }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

// Зміна значення в стейт

const handleInputChange = event => {

const { name, value} = event.target;

switch (name) {
  case 'name':
    setName(value)
    break;

  case 'number':
    setNumber(value)
    break;

  default:
    break;
}
}

// Отримуємо контакти

const handleSubmit = event => {
  event.preventDefault();

const contactData = {
  name: name,
  number: number,
  id: nanoid(),
}

handleAddInf(contactData);
  setName('');
  setNumber('');
}

    return (
      <form 
      className={css.form}
      onSubmit={handleSubmit}>
          <label
          className={css.label}
          >
            <span>Name</span>
        <input 
        onChange={handleInputChange} 
        value={name} 
        type="text" 
        name="name" 
        required />
          </label>
          <label
          className={css.label}
          >
            <span>Number</span>
        <input 
        onChange={handleInputChange} 
        value={number} 
        type="tel" 
        name="number" 
        required />
          </label>
          <button 
          className={css.class_btn}
          type="submit">
            Add contact
            </button>
        </form>
    )
}
