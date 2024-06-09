import express from 'express'
import connection from './src/utils/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
dotenv.config({path : './.env'});
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));

//Router imports : 
import router from './src/Routes.js/blogRoute.js';
app.use('/', router)

connection()
.then(()=>{
    app.on("err", (e)=>{
        console.log("App error", e)
    })
    app.listen(process.env.PORT, ()=>{
        console.log(`Listening on port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Problem in connecting to db !", err)
})