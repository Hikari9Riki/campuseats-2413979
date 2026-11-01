import { Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import VendorCard from '../components/VendorCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  const { recentlyViewed, clearRecentlyViewed } = useCart()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  // Resolve items from either saved metadata or live vendor data
  function resolveViewedItem(entry) {
    const itemId = typeof entry === 'string' ? entry : entry.id
    for (const vendor of vendors) {
      const found = vendor.menu.find((m) => m.id === itemId)
      if (found) {
        return {
          id: found.id,
          name: found.name,
          price: found.price,
          category: found.category,
          vendorId: vendor.id,
          vendorName: vendor.name,
        }
      }
    }
    return typeof entry === 'object' && entry !== null ? entry : null
  }

  const viewedItems = recentlyViewed
    .map(resolveViewedItem)
    .filter((item) => item && item.vendorId)

  return (
    <>
      <section>
        <h2 className="section-title">Choose a vendor</h2>
        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      <section>
        <div className="row">
          <h2 className="section-title">Recently viewed</h2>
          {viewedItems.length > 0 && (
            <button
              type="button"
              className="btn btn-small"
              onClick={clearRecentlyViewed}
            >
              Clear
            </button>
          )}
        </div>

        {viewedItems.length === 0 ? (
          <p className="muted">
            No items viewed yet. Open a vendor menu and click “View item →” on any dish.
          </p>
        ) : (
          <div className="grid">
            {viewedItems.map((item) => (
              <Link
                key={item.id}
                to={`/vendor/${item.vendorId}`}
                className="card"
              >
                <span className="tag">{item.category}</span>
                <h3>{item.name}</h3>
                <p className="muted">{item.vendorName}</p>
                {typeof item.price === 'number' && (
                  <p className="price">RM {item.price.toFixed(2)}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default HomePage