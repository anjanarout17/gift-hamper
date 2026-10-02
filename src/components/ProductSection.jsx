import ProductCard from "./ProductCard";

function ProductSection({
  title,
  products,
  selectedProducts,
  onAdd,
  onRemove,
}) {

  function getQuantity(productId) {

    const item = selectedProducts.find(
      (item) => item.id === productId
    );

    return item ? item.quantity : 0;
  }

  return (
    <section className="product-section">

      <h2>{title}</h2>

      <div className="product-grid">

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
            quantity={getQuantity(product.id)}
            onAdd={onAdd}
            onRemove={onRemove}
          />

        ))}

      </div>

    </section>
  );
}

export default ProductSection;