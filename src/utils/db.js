import mongoose from "mongoose"
import {db_name} from '../constants.js'

const connection = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("DataBase connected successfully", connectionInstance.connection.host)
    }catch(e){
        console.log("Error in connecting to database : ", e);
    }
}

export default connection