import mongoose from 'mongoose'

const userpostSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    blogText : {
        type : String,
        required : true
    },
    picture : {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    categories : {
        type : String,
        required : true,
    },
    createdDate : {
        type : Date,
    }
}, {timestamps : true})

const post = mongoose.model('post', userpostSchema)

export default post