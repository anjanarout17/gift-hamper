function ProductCard({ product, quantity, onAdd, onRemove }) {
    return (
      <div className="product-card">
  
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>
  
        <h3>{product.name}</h3>
  
        <p className="price">
          ₹{product.price}
        </p>
  
        {quantity === 0 ? (
  
          <button
            className="add-button"
            onClick={() => onAdd(product)}
          >
            + Add
          </button>
  
        ) : (
  
          <div className="quantity-control">
  
            <button
              onClick={() => onRemove(product)}
            >
              −
            </button>
  
            <span>{quantity}</span>
  
            <button
              onClick={() => onAdd(product)}
            >
              +
            </button>
  
          </div>
  
        )}
  
      </div>
    );
  }
  
  export default ProductCard;