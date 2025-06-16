import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigate = useNavigate()

  const api = import.meta.env.VITE_API_URL

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirm) return alert('Passwords do not match')
    await axios.post(`${api}/auth/register`, { username, email, password })
    navigate('/login')
  }

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto">
      <input className="input input-bordered w-full mb-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="input input-bordered w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" className="input input-bordered w-full mb-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <input type="password" className="input input-bordered w-full mb-2" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} />
      <button className="btn btn-primary w-full">Register</button>
    </form>
  )
}
