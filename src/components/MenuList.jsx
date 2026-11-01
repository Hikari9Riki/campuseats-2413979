import MenuItemCard from './MenuItemCard.jsx'
import { useCart } from '../hooks/useCart.js'

function MenuList({ items, vendor }) {
  const { addToCart, recordView } = useCart()

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          onAdd={() => addToCart(item)}
          onView={() => vendor && recordView(item, vendor)}
        />
      ))}
    </div>
  )
}

export default MenuList