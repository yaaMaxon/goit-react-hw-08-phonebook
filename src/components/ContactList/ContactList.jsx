import css from './ContactList.module.css';

export const ContactList = ({contacts, onDelete}) => {
    return (
      <ul className={`${css.list} ${css.text}`}>
          {contacts.map(contact => {
            return (
            <li key={contact.id}>
              <span>
                {contact.name}: {contact.number}
              </span>
              <button 
              className={css.class_btn}
              onClick={() => onDelete(contact.id)} 
              type="button">
                Delete
              </button>
            </li>)
          })}
        </ul>
    )
}
