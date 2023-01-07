const fs = require('fs/promises')
const path = require('path')

// const { nanoid } = require('nanoid');


const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

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

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  try{
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(data);

    const {name, email, phone} = body
    const newContacts = {id : nanoid(2), name, email,phone}
    parsedContacts.push(newContacts)
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts))
    
    return parsedContacts

    } catch(err){
      console.log(err.message)}
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
