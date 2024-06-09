import Post from '../models/userPosts.js'
import {ApiResponse} from '../utils/ApiResponse.js'

export const createPost = async (req, res) => {
    try {
        const post = await new Post(req.body)
        post.save();
        return res.status(200).json(
            new ApiResponse(200, {}, "Post Saved SuccessFully")
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Couldn't save post")
        )
    }
}

export const getAllPosts = async (req, res) => {
    let category = req.query.category;
    let posts;
    try {
        if(category){
            posts = await Post.find({categories : category})
        }else{
             posts = await Post.find({})
        }
        return res.status(200).json(
            new ApiResponse(200, posts, "Data sent successfully")
        )
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, {}, error.message)
        )
    }
}  

export const getPostData= async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        return res.status(200).json(new ApiResponse(200, post, "Data sent successfully"))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, {}, error.message))
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        
        if(!post){
            return res.status(404).json(new ApiResponse(404, {}, "Post not found"))
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set :  req.body})
        return res.status(200).json(new ApiResponse(200, updatedPost, "Post updated successfully"))
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, {}, error.message)
        )
    }
}

export const deletePost = async(req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if(!post){
            return res.status(404).json(new ApiResponse(404, {}, "Post not found"))
        }
        return res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, "", error.message))
    }
}