const express = require('express')
const New = require('../models/new')
const auth = require('../middleware/auth')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
cloudinary.config({
  cloud_name: 'tourists-services',
  api_key: '521318868529862',
  api_secret: 'GtQwqyuIxTKx0Nh-39mDxBmetas',
})
const router = new express.Router()

// Get news
router.get('/', auth, async (req, res) => {
  try {
    const news = await New.find({}).sort({createdAt: 'desc'})
    if (!news) return res.status(404).send()
    res.send(news)
  } catch (e) {
    res.status(500).send()
  }
})

// Get brief
router.get('/brief', auth, async (req, res) => {
  try {
    const news = await New.find({}).sort({createdAt: 'desc'}).limit(5)
    res.send(news)
  } catch (e) {
    res.status(500).send()
  }
})

//Get count
router.get('/count', auth, async (req, res) => {
  try {
    const count = await New.countDocuments({})
    res.send({ count })
  } catch (e) {
    res.status(500).send()
  }
})

// add new with image
const fileUpload = multer()
router.post('/', auth, fileUpload.single('file'), function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result)
          } else {
            reject(error)
          }
        }
      )
      streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
  }
  async function upload(req) {
    let result = await streamUpload(req)
    const news = new New({
      'image': result.secure_url,
      'title': req.body.title,
      'description': req.body.description
    })
    await news.save()
    res.send(news)
  }  
  upload(req)
})

// Delete new
router.delete('/:id', auth, async (req, res) => {
  try {
    await New.findByIdAndDelete(req.params.id)
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})



module.exports = router