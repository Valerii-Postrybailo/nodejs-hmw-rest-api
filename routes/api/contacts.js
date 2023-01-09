const express = require('express')

const router = express.Router()

const Joi = require('joi');

const contactsListOperations = require('../../models/contacts.js')

////////////////////////////////////////////////////////////////

router.get('/', async (req, res) => {
  res.json({ 
    status: 'success',
    code: 200,
    data : {
      result : await contactsListOperations.listContacts(),
    }
  })
})

///////////////////////////////////////////////////////////////

router.get('/:contactId', async (req, res) => {
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

/////////////////////////////////////////////////////////

router.post('/', async (req, res) => {
  const {name, email, phone} = req.body

  if (name && email && phone){
    const newContact = await contactsListOperations.addContact(req.body)

    const shema = Joi.object({
      id : Joi.string().required(),
      name : Joi.string().required(),
      email: Joi.string().email().required(),
      phone : Joi.string().min(14).max(14).required(),
    })

    const {error, value} = shema.validate(newContact);

    if (error) {
      console.log(error.message)
    }

    if(!error && value){
      res.status(201).json({
        status: 'success',
        code: 201,
        data: { value },
      });
    }else {
      res.json({
        status: 'success',
        code: 404,
        message: "Not found"
      });
    }

  } else {
    res.status(400).json({
      status:"fail",
      code:400,
      message: "missing required name field",
    })
  }
})

/////////////////////////////////////////////////////////////

router.delete('/:contactId', async (req, res) => {

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


////////////////////////////////////////////////////////

router.put('/:contactId', async (req, res) => {
  const {name, email, phone} = req.body;

  if(!name || !email || !phone){
    res.json({
      code: 404,
      message:"missing fields",
    })
  } else {

    const contacts =  await contactsListOperations.updateContact(req.params.contactId, req.body)
    const shema = Joi.object({
      id : Joi.string().required(),
      name : Joi.string().required(),
      email: Joi.string().email().required(),
      phone : Joi.string().min(14).max(14).required(),
    })

    const {error, value} = shema.validate(contacts);

    if (error) {
      console.log(error.message)
    }

    if (!error && value){
      res.json({
        status: 'success',
        code: 200,
        data: { value},
    })} else {
      res.json({
        status: 'success',
        code: 404,
        message: "Not found"
      });
    }
  }
})

////////////////////////////////////////////////////

module.exports = router
