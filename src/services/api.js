import axios from "axios";

const contactsInstance = axios.create({
    baseURL: 'https://6544c1b55a0b4b04436cea91.mockapi.io/',
})

export const fetchContacts = async () => {
    const { data } = await contactsInstance.get('/contacts');
    return data;
}

export const fetchAddContact = async (newContact) => {
    const { data } = await contactsInstance.post('/contacts', newContact);
    return data;
}

export const fetchDeleteContact = async (contactId) => {
    const { data } = await contactsInstance.delete(`/contacts/${contactId}`);
    return data;
}