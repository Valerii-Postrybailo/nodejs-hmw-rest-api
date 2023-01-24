const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/api/user');
const usersRouter = require('./routes/api/usersData');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/api/users', usersRouter);
app.use('/api/users', authRouter);

// const tempDir = path.join(__dirname, "temp");
// const productsDir = path.join(__dirname, "public", "avatars")



// app.post("/api/contacts", upload, async (req, res) => {
//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.json(productsDir, originalname);

//   try {
//     await fs.rename(tempUpload, resultUpload);
//     const image = path.join( "avatars", originalname);

//     const newContact = {
//       name: req.body.name,
//       id: "v4()",
//       image
//     };
//     productsDir.push(newContact);
//     res.status(201).json(newContact);
//   } catch (error){
//     await fs.unlink(tempUpload);
//   }
// });

app.use('/api/users', usersRouter);
app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
