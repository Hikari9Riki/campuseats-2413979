import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="card">
      <h2>404 — Page not found</h2>
      <p className="muted">The page you are looking for does not exist.</p>
      <p><Link to="/">← Back to home</Link></p>
    </div>
  )
}

export default NotFoundPage