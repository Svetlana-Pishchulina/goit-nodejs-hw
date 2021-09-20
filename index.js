const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contactList = await listContacts();
        console.table(contactList);
      } catch (error) {
        console.log(error.message);
      } finally {
        break;
      }

    case "get":
      try {
        const searchedUser = await getContactById(id);
        if (!searchedUser) {
          throw new Error(`Товар с id=${id} не найден`);
        }
        console.table(searchedUser);
      } catch (error) {
        console.log(error.message);
      } finally {
        break;
      }

    case "add":
      try {
        const newContactslist = await addContact(name, email, phone);
        console.table(newContactslist);
      } catch (error) {
        console.log(error.message);
      } finally {
        break;
      }

    case "remove":
      try {
        const newContactslist = await removeContact(id);
        if (!newContactslist) {
          throw new Error(`Товар с id=${id} не найден`);
        }
        console.table(newContactslist);
      } catch (error) {
        console.log(error.message);
      } finally {
        break;
      }

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
