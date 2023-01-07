const express = require('express')
// const { nanoid } = require('nanoid')

const router = express.Router()

const contactsListOperations = require('../../models/contacts.js')

router.get('/', async (req, res, next) => {
  res.json({ 
    status: 'success',
    code: 200,
    data : {
      result : await contactsListOperations.listContacts(),
    }
  })
})

router.get('/:contactId', async (req, res, next) => {
  const contacts =  await contactsListOperations.getContactById(req.params.contactId)
  console.log(contacts)
  if(contacts){
    res.json({ 
      status: 'success',
      code: 200,
      data : {
        result : {contacts},
      }
    })
  } else{
    res.json({
      code: 404,
      message:"Not found",
    })
  }
  
  
})

router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body
  console.log(req.body)
  if (name && email && phone){
    // const contact = {
    //   id: nanoid(),
    //   name,
    //   email,
    //   phone,
    // }

    const newContact = await contactsListOperations.addContact()

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact },
    });
  } else {
    res.json({
      status:"fail",
      code:400,
      message: "missing required name field",
    })
  }
  res.json({ message: 'post' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'delete' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'put' })
})

module.exports = router
