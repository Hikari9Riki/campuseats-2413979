import { Link, useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor not found</h2>
        <p className="muted">We could not find a vendor with ID "{id}".</p>
        <p><Link to="/">← Back to vendors</Link></p>
      </div>
    )
  }

  return (
    <>
      <p><Link to="/">← All vendors</Link></p>
      <div className="card vendor-card" style={{ marginBottom: '1.5rem' }}>
        <div className="thumb" aria-hidden="true">{vendor.name.charAt(0)}</div>
        <div>
          <h2>{vendor.name}</h2>
          <p className="muted">{vendor.location}</p>
          <p className="muted">Open: {vendor.openHours}</p>
          <span className={vendor.isOpen ? 'status open' : 'status closed'}>
            {vendor.isOpen ? 'Open now' : 'Closed'}
          </span>
        </div>
      </div>

      <h2 className="section-title">Menu</h2>
      <MenuList items={vendor.menu} vendor={vendor} />
    </>
  )
}

export default VendorPage