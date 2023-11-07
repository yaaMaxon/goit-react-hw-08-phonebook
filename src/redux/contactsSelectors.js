export const selectContacts = (state) => state.contactsData.contacts.items;
export const selectContactsIsLoading = (state) => state.contactsData.contacts.isLoading;
export const selectContactsError = (state) => state.contactsData.contacts.error;
export const selectContactsFilter = (state) => state.contactsData.filter;