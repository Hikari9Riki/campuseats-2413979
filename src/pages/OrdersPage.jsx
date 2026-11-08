import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <div className="card">
        <h2>My Orders</h2>
        <p className="muted">You have not placed any orders yet.</p>
        <p><Link to="/">Browse vendors</Link></p>
      </div>
    )
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <div className="row">
              <h3>Order for {order.name}</h3>
              <span className="status open">Placed</span>
            </div>
            <p className="muted">
              Mahallah: {order.mahallah} &middot; Pickup time: {order.pickupTime}
            </p>
            {order.items && order.items.length > 0 && (
              <ul className="cart-list" style={{ marginTop: '0.5rem' }}>
                {order.items.map((line) => (
                  <div key={line.item.id} className="row" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span>{line.qty}x {line.item.name}</span>
                      {/* Add this line to show the note if it exists */}
                      {line.note && (
                        <span className="muted" style={{ fontSize: '0.85rem', marginTop: '2px' }}>
                          Note: {line.note}
                        </span>
                      )}
                    </div>
                    <span>RM {(line.item.price * line.qty).toFixed(2)}</span>
                  </div>
                ))}
              </ul>
            )}
            <p className="cart-total">Total: RM {Number(order.total).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage