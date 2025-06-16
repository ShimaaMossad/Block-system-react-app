import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  author: String
})

export default mongoose.model('Post', postSchema)
