import {ApiResponse} from '../utils/ApiResponse.js'
import mongoose from 'mongoose'
import grid from 'gridfs-stream'

const url = 'http://localhost:8000'

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName : 'photos'
    });
    gfs = grid(conn.db, mongoose.mongo)
    gfs.collection('photos')
})

export const uploadImage = (req, res) => {
    if(!req.file){
        return res.status(400).json(
            new ApiResponse(400, {},"File not found")
        )
    }
    console.log(req.file)
    const imageUrl = `${url}/file/${req.file.filename}`

    return res.status(200).json(
        new ApiResponse(200, {imageUrl})
    )
}

export const getImage = async(req, res) => {
    try {
        console.log(req.params)
        const file = await gfs.files.findOne({filename : req.params.filename})
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, {}, "Cannot find image")
        )
    }
}