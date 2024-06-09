import Comment from  '../models/comment.js'
import {ApiResponse} from '../utils/ApiResponse.js'

export const newComment = async(req, res) => {
    try {
        const comment = await new Comment(req.body)
        comment.save()
        return res.status(200).json(new ApiResponse(200, comment, "Saved successfully"))
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, {}, error.message)
        )
    }
}

export const getComments = async(req, res) => {
    try {
        const comments = await Comment.find({postId : req.params.id})
        return res.status(200).json(new ApiResponse(200, comments, "Sent successfully"))

    } catch (error) {
        return res.status(500).json(new ApiResponse(500, {}, error.message))
    }
}

export const deleteComment = async(req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)

        return res.status(200).json(new ApiResponse(200, {}, "Comment deleted successfully"))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, {}, error.message))
    }
}