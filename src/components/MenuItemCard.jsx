function MenuItemCard({ item, onAdd, onView }) {
  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
      <p className="tag">{item.category}</p>
      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>
      <button className="btn" disabled={!item.available} onClick={onAdd}>
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
      {onView && (
        <button type="button" className="view-link" onClick={onView}>
          View item →
        </button>
      )}
    </article>
  )
}

export default MenuItemCard