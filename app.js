const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const config = require('config')
//mongoose 
var cors = require('cors')
const mongoose = require('mongoose')
const app = express()

//DB cofig
const db = config.get('mongoURI')


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

//connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDb connected.....'))
    .catch(err => console.log(err))

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//Bodyparser
app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.use(cors(corsOptions))

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})