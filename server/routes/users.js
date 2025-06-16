import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)
  try {
    const user = new User({ username, email, password: hashed })
    await user.save()
    res.json({ msg: 'User registered' })
  } catch (err) {
    res.status(400).json({ msg: 'Email already exists' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ msg: 'User not found' })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(400).json({ msg: 'Wrong password' })

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET)
  res.json({ token, username: user.username })
})

export default router
