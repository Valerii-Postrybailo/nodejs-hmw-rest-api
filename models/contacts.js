const fs = require('fs/promises');
const path = require('path');

const {v4} = require('uuid');


const contactsPath = path.join(__dirname, './contacts.json')

///////////////////////////////////////////////////////////

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

///////////////////////////////////////////////////////////

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const result = contacts.find(item => item.id === String(contactId))

    if (!result){
      return null
    } else{
      return result
    }
  } catch (err) {
    console.log(err.message);
  }
}

///////////////////////////////////////////////////////////

const removeContact = async (contactId) => {
  try{
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(data);
    const indx = parsedContacts.findIndex(item => item.id === String(contactId))
      if (indx === -1){
        return null
      } else {
        const [removeContact] = parsedContacts.splice(indx,1)
        fs.writeFile(contactsPath, JSON.stringify(parsedContacts))
        return removeContact
      }

    } catch(err){
      console.log(err.message)}
}

//////////////////////////////////////////////////////////

const addContact = async (body) => {
  try{
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(data);

    const {name, email, phone} = body
    const newContacts = {id : v4(), name, email, phone}
    parsedContacts.push(newContacts)
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts))

    return newContacts

    } catch(err){
      console.log(err.message)}
}

//////////////////////////////////////////////////////////

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData =  JSON.parse(data);

    const {name, email, phone} = body;
    const [contact] = parsedData.filter(item => item.id === String(contactId)) 
    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    const [] = parsedData.splice(contactId - 1 , 1, contact)
    fs.writeFile(contactsPath, JSON.stringify(parsedData))

    return contact

  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
