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

  if (name && email && phone){
    const newContact = await contactsListOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { newContact },
    });
  } else {
    res.status(400).json({
      status:"fail",
      code:400,
      message: "missing required name field",
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const contacts =  await contactsListOperations.removeContact(req.params.contactId)
  if(contacts){
    res.json({ 
      status: 'success',
      code: 200,
      message: "contact deleted",
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

router.put('/:contactId', async (req, res, next) => {
  const contacts =  await contactsListOperations.removeContact(req.params.contactId, req.body)
  console.log(req.body)
  const {name, email, phone} = req.body;

  if(!name || !email || !phone){
    res.json({
      code: 404,
      message:"missing fields",
    })
  } else {
    if(contacts){
      res.json({
        status: 'success',
        code: 200,
        data: { contacts},
      });
    }else{
      res.json({
        status: 'success',
        code: 404,
        message: "Not found"
      });
    }
    
  }
})

module.exports = router
