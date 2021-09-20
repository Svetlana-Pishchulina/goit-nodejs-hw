const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
const allContacts = require("./db/contacts.json");

const listContacts = () => {
  return allContacts;
};

const getContactById = (contactId) => {
  const searchedUser = allContacts.find((contact) => contact.id === contactId);
  if (!searchedUser) {
    return null;
  }
  return searchedUser;
};

const removeContact = async (contactId) => {
  const newContactslist = allContacts.filter(
    (contact) => contact.id != contactId
  );
  if (allContacts.length === newContactslist.length) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(newContactslist));
  return newContactslist;
};

const addContact = async (name, email, phone) => {
  const newUserId = allContacts[allContacts.length - 1].id + 1;
  const newUser = { id: newUserId, name, email, phone };
  const newContactslist = [...allContacts, newUser];
  await fs.writeFile(contactsPath, JSON.stringify(newContactslist));
  return newContactslist;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
