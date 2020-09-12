const express:any = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({limit: '100mb'}))
app.use(express.urlencoded({extended: false, limit: '100mb'}))

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('db connected'))


app.get('/', (req:any, res:any) => {
  res.send('hello world');
})

// express router middlewares
app.use('/auth', require('./routes/auth'));
app.use('/recipes', require('./routes/recipes'));

app.listen(process.env.PORT || 1337, () => console.log('server running'))