import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([]) // lines of { item, qty }
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)
  const [recentlyViewed, setRecentlyViewed] = useState([]) // item ids, newest first, max 5

  // Fetch vendors from the mock API, with loading/error state and a cleanup.
  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) setSelectedVendorId((prev) => prev ?? data[0].id)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [reloadKey])

  function handleRetry() {
    setLoading(true)
    setError(null)
    setReloadKey((k) => k + 1)
  }

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId) ?? vendors[0]

  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

  function cartTotal() {
    return cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
  }

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  function handlePlaceOrder(details) {
    const total = cartTotal()
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // Personal feature (last digit 9): "Recently viewed" menu items.
  function handleViewItem(itemId) {
    setRecentlyViewed((prev) =>
      [itemId, ...prev.filter((id) => id !== itemId)].slice(0, 5)
    )
  }

  function handleClearViewed() {
    setRecentlyViewed([])
  }

  function findItemById(id) {
    for (const vendor of vendors) {
      const item = vendor.menu.find((m) => m.id === id)
      if (item) return item
    }
    return null
  }

  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed 🎉</h2>
        <p>Thanks, {lastOrder?.name}!</p>
        <p>Pickup time: {lastOrder?.pickupTime}</p>
        <p>Total: RM {lastOrder?.total.toFixed(2)}</p>
        <button type="button" className="btn" onClick={() => setView('menu')}>
          Back to menu
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={handleRetry} />
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendor?.id}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Menu: {selectedVendor?.name}</h2>
          <MenuList items={selectedVendor?.menu ?? []} onAdd={handleAddToCart} onView={handleViewItem} />
        </section>

        <section>
          <h2 className="section-title">Recently viewed</h2>
          {recentlyViewed.length === 0 ? (
            <p className="muted">No items viewed yet. Click “View item” on any menu item.</p>
          ) : (
            <>
              <div>
                {recentlyViewed.map((id) => {
                  const item = findItemById(id)
                  return item ? (
                    <span key={id} className="tag" style={{ marginRight: '0.4rem' }}>{item.name}</span>
                  ) : null
                })}
              </div>
              <button type="button" className="btn btn-small" onClick={handleClearViewed}>
                Clear
              </button>
            </>
          )}
        </section>
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App
