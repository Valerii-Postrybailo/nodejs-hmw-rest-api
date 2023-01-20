const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const multer = require('multer')


const authRouter = require('./routes/api/user');
const usersRouter = require('./routes/api/usersData');
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter);
app.use('/api/users', authRouter);

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null,tempDir) 
  }, 
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits:{
    fileSize: 2048
  }
});

const upload = multer({
  storage: multerConfig
});


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
