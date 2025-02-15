const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();

const {DB_HOST} = process.env;

mongoose.set("strictQuery", false)

mongoose.connect(DB_HOST, {
  dbName: `db-contacts`,
  useUnifiedTopology: true,
})
  .then(()=> {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })
    console.log("Database connection successful");
  })
  
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

const app = express();

app.use(express.json());
app.use(cors());

const authRouter = require('./routes/api/user');
const usersRouter = require('./routes/api/usersData');
const contactsRouter = require('./routes/api/contacts');

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);
