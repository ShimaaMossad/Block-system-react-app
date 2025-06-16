import express from 'express'
import Post from '../models/Post.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 })
  res.json(posts)
})

router.post('/', verifyToken, async (req, res) => {
  const { title, body, image } = req.body
  const post = new Post({
    title,
    body,
    image,
    author: req.user.username
  })
  await post.save()
  res.json(post)
})

router.put('/:id', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post.author !== req.user.username) return res.status(403).json({ msg: 'Unauthorized' })
  post.title = req.body.title
  post.body = req.body.body
  post.image = req.body.image
  await post.save()
  res.json(post)
})

router.delete('/:id', verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post.author !== req.user.username) return res.status(403).json({ msg: 'Unauthorized' })
  await post.deleteOne()
  res.json({ msg: 'Deleted' })
})

export default router
