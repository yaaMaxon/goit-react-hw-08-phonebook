import { fetchAddContact, fetchContacts, fetchDeleteContact } from "services/api";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

export const requestContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const contacts = await fetchContacts();

      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  })

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const contact = await fetchAddContact(newContact);
      
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  })  

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const contact = await fetchDeleteContact(contactId);
      
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  })   

const INITIAL_STATE = { 
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: "",
}

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: "contacts",
  // Початковий стан редюсера слайсу
  initialState: INITIAL_STATE,
  // Об'єкт редюсерів
  reducers: {
    filterUpdate (state, action){
        state.filter = action.payload;
    },
  },

  extraReducers: builder => builder
    .addCase(requestContacts.fulfilled, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items = action.payload;
    })

    .addCase(addContact.fulfilled, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items.push(action.payload);
    })

    .addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items = state.contacts.items.filter(
        contact => contact.name !== action.payload.name);
    })

    .addMatcher(
     isAnyOf(
      requestContacts.pending, 
      addContact.pending, 
      deleteContact.pending), 
    state => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    })
    .addMatcher(
     isAnyOf(
      requestContacts.rejected, 
      addContact.rejected, 
      deleteContact.rejected), (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    })
});

// Генератори екшенів
export const { filterUpdate } = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;

