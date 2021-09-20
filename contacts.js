const fs = require("fs");
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

const removeContact = (contactId) => {
  const newContactslist = allContacts.filter(
    (contact) => contact.id != contactId
  );
  if (allContacts.length === newContactslist.length) {
    return null;
  }
  fs.writeFile(contactsPath, JSON.stringify(newContactslist), (err) => {
    if (err) {
      console.log(err);
    }
  });
  return newContactslist;
};

const addContact = (name, email, phone) => {
  const newUserId = allContacts[allContacts.length - 1].id + 1;
  const newUser = { id: newUserId, name, email, phone };
  const newContactslist = [...allContacts, newUser];
  fs.writeFile(contactsPath, JSON.stringify(newContactslist), (err) => {
    if (err) {
      console.log(err);
    }
  });
  return newContactslist;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
