import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'
import axios from 'axios'

export default function Home() {
  const [posts, setPosts] = useState([])
  const isLoggedIn = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const navigate = useNavigate()

  const api = import.meta.env.VITE_API_URL

  const getPosts = async () => {
    const res = await axios.get(`${api}/posts`)
    setPosts(res.data)
  }

  useEffect(() => {
    getPosts()
  }, [])

  const handleDelete = async (id) => {
    await axios.delete(`${api}/posts/${id}`, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    getPosts()
  }

  const handleEdit = (post) => {
    navigate('/form', { state: { editPost: post } })
  }

  return (
    <div className="p-4">
      {posts.map(post => (
        <PostCard
          key={post._id}
          post={post}
          canEdit={isLoggedIn && post.author === username}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
      {isLoggedIn && (
        <Link to="/form" className="fixed bottom-5 right-5 btn btn-primary rounded-full text-3xl">+</Link>
      )}
    </div>
  )
}
