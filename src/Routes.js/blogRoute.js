import express from 'express'
import {signUpUser, loginUser} from '../controller/UserAuth.controller.js'
import { uploadImage, getImage } from '../controller/FileUploader.js';
import upload from '../middleware/upload.js'
import { createPost, getAllPosts, getPostData, updatePost, deletePost } from '../controller/PostController.js';
import {authenticateToken} from '../controller/jwtController.js'
import { newComment, getComments, deleteComment } from '../controller/CommentComtroller.js';

const router = express.Router();

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.post('/file/upload', upload.single('file'), uploadImage)
router.get('/file/:filename', getImage)
router.post('/createPost', authenticateToken , createPost)
router.get('/posts', authenticateToken, getAllPosts)
router.get('/postview/:id', authenticateToken, getPostData)
router.put('/update/:id', authenticateToken, updatePost)
router.delete('/delete/:id', authenticateToken, deletePost)
router.post('/comment/new', authenticateToken, newComment)
router.get('/comments/:id', authenticateToken, getComments)
router.delete('/comment/delete/:id', authenticateToken, deleteComment)

export default router