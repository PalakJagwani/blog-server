import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    postId : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    comment : {
        type : String,
        required : true
    }
}, {timestamps : true})

const comment = mongoose.model('comment', commentSchema)

export default comment;