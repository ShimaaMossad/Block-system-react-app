import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('username', res.data.username)
    navigate('/')
  }

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto">
      <input className="input input-bordered w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" className="input input-bordered w-full mb-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary w-full">Sign In</button>
      <Link to="/register" className="block mt-2 text-blue-600">Don't have an account? Sign up</Link>
    </form>
  )
}