// const app = require('./app')
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

const contactsRouter = require('./routes/api/contacts');
app.use('/api/contacts', contactsRouter);

// app.use((_, res, __) => {
//   res.status(404).json({
//     status: 'error',
//     code: 404,
//     message: 'Use api on routes: /api/contacts',
//     data: 'Not found',
//   });
// });

// app.use((err, _, res, __) => {
//   console.log(err.stack);
//   res.status(500).json({
//     status: 'fail',
//     code: 500,
//     message: err.message,
//     data: 'Internal Server Error',
//   });
// });

// const PORT = process.env.PORT || 3000;
// const uriDb = process.env.DB_HOST;

// const connection = mongoose.connect(uriDb, {
//   promiseLibrary: global.Promise,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// connection
//   .then(() => {
//     app.listen(PORT, function () {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//   })
//   .catch(err =>
//     console.log(`Server not running. Error message: ${err.message}`),
//   );

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
