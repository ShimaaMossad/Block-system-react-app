import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Form() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const editPost = location.state?.editPost

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title)
      setBody(editPost.body)
      setImage(editPost.image)
    }
  }, [editPost])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editPost) {
      await axios.put(`http://localhost:5000/api/posts/${editPost._id}`, { title, body, image }, {
        headers: { Authorization: localStorage.getItem('token') }
      })
    } else {
      await axios.post('http://localhost:5000/api/posts', { title, body, image }, {
        headers: { Authorization: localStorage.getItem('token') }
      })
    }
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-base-200 p-6 rounded">
      <input className="input input-bordered w-full mb-4" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="textarea textarea-bordered w-full mb-4" placeholder="Body" value={body} onChange={e => setBody(e.target.value)} />
      <input className="input input-bordered w-full mb-4" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
      <button className="btn btn-primary w-full">{ editPost ? "Update" : "Submit"}</button>
    </form>
  )
}