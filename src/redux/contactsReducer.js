import { fetchAddContact, fetchContacts, fetchDeleteContact } from "services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      
      console.log(contact)
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

  extraReducers: builder =>
    builder.addCase(requestContacts.pending, (state, action) => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    })
    .addCase(requestContacts.fulfilled, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items = action.payload;
    })
    .addCase(requestContacts.rejected, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    })

    .addCase(addContact.pending, (state, action) => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    })
    .addCase(addContact.fulfilled, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items.push(action.payload);
    })
    .addCase(addContact.rejected, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    })

    .addCase(deleteContact.pending, (state, action) => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.items = state.contacts.items.filter(
        contact => contact.name !== action.payload.name);
    })
    .addCase(deleteContact.rejected, (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    })
});

// Генератори екшенів
export const { filterUpdate } = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;

