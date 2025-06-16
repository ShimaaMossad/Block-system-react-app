import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav className="navbar bg-base-300 mb-4 shadow p-4 flex justify-between">
      <h1 className="text-xl font-bold">ESS Platform</h1>
      <div>
        <Link className='p-3' to="/">Home</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-error">Logout</button>
        ) : (
          <Link to="/login" className="btn btn-outline">Login</Link>
        )}
      </div>
    </nav>
  )
}