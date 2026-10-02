function Summary({
    selectedBox,
    selectedProducts,
    onRemove,
    onReset,
  }) {
  
    const boxPrice =
      selectedBox?.price || 0;
  
    const productsPrice =
      selectedProducts.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      );
  
    const total = boxPrice + productsPrice;
  
    const itemCount =
      selectedProducts.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );
  
    function orderOnWhatsApp() {
  
      let message =
        "Hello! I would like to order this hamper:%0A%0A";
  
      if (selectedBox) {
  
        message +=
          `Box: ${selectedBox.name} - ₹${selectedBox.price}%0A`;
  
      }
  
      selectedProducts.forEach((item) => {
  
        message +=
          `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}%0A`;
  
      });
  
      message +=
        `%0ATotal: ₹${total}`;
  
      const phoneNumber =
        "919999999999";
  
      window.open(
        `https://wa.me/${phoneNumber}?text=${message}`,
        "_blank"
      );
    }
  
    return (
  
      <div className="summary">
  
        <div className="summary-header">
  
          <h2>Hamper Summary</h2>
  
          <button
            className="reset-button"
            onClick={onReset}
          >
            Reset
          </button>
  
        </div>
  
        {!selectedBox &&
          selectedProducts.length === 0 && (
  
          <p className="empty-message">
            Your hamper is empty.
          </p>
  
        )}
  
        {selectedBox && (
  
          <div className="summary-item">
  
            <span>{selectedBox.name}</span>
  
            <strong>
              ₹{selectedBox.price}
            </strong>
  
          </div>
  
        )}
  
        {selectedProducts.map((item) => (
  
          <div
            className="summary-item"
            key={item.id}
          >
  
            <span>
              {item.name} × {item.quantity}
            </span>
  
            <strong>
              ₹{item.price * item.quantity}
            </strong>
  
          </div>
  
        ))}
  
        <hr />
  
        <div className="item-count">
          {itemCount} product(s)
        </div>
  
        <div className="total-row">
  
          <span>Total</span>
  
          <strong>
            ₹{total}
          </strong>
  
        </div>
  
        <button
          className="whatsapp-button"
          onClick={orderOnWhatsApp}
          disabled={!selectedBox}
        >
          Order This Hamper on WhatsApp
        </button>
  
      </div>
    );
  }
  
  export default Summary;