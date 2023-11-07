import css from './Filter.module.css';

export const Filter = ({filter, handleChange}) => {
    return (
      <label
      className={css.label}>
            <span
            className={css.findContacts}
            >
                Find contacts by name
            </span>
            <input 
            onChange={handleChange} 
            value={filter} 
            type="text" 
            name="filter" />
          </label>
    )
}
