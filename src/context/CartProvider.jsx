import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])
  // Personal feature (matric last digit 9): Recently viewed items persisted in localStorage
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('campuseats-recently-viewed', [])

  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  function addToCart(item) {
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

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
  }

 const updateItemNote = (id, note) => {
    setCart((prev) => 
      prev.map((line) => 
        line.item.id === id ? { ...line, note: note } : line
      )
    );
  };

  function placeOrder(details) {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...details,
      items: cart,
      total,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setOrders((prev) => [newOrder, ...prev])
    setCart([])
    return newOrder
  }

  // Personal feature (last digit 9): save recently viewed item with its vendor info
  function recordView(item, vendor) {
    const entry = {
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      vendorId: vendor.id,
      vendorName: vendor.name,
    }
    setRecentlyViewed((prev) =>
      [entry, ...prev.filter((v) => v.id !== item.id)].slice(0, 5)
    )
  }

  function clearRecentlyViewed() {
    setRecentlyViewed([])
  }
  
  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    updateItemNote,
    placeOrder,
    recentlyViewed,
    recordView,
    clearRecentlyViewed,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}