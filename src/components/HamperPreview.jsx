import { useRef } from "react";

export default function HamperPreview({
  selectedBox,
  selectedProducts,
  ribbon,
  onPositionChange,
  onBringToFront,
  onAutoArrange,
}) {
  const productsRef = useRef(null);

  function drag(event, product) {
    event.preventDefault();
    event.stopPropagation();

    const area = productsRef.current;
    if (!area) return;

    onBringToFront(product.uniqueId);

    const rect = area.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const startLeft = product.x;
    const startTop = product.y;

    const move = (moveEvent) => {
      const deltaX = ((moveEvent.clientX - startX) / rect.width) * 100;
      const deltaY = ((moveEvent.clientY - startY) / rect.height) * 100;

      // Keep the centre of every gift inside the usable basket area.
      const nextX = Math.max(8, Math.min(92, startLeft + deltaX));
      const nextY = Math.max(8, Math.min(92, startTop + deltaY));

      onPositionChange(product.uniqueId, nextX, nextY);
    };

    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
    };

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  }

  return (
    <div className="preview-container">
      <div className="preview-top">
        <div>
          <span className="summary-kicker">LIVE PREVIEW</span>
          <h2>Your hamper</h2>
        </div>
        <button className="arrange-button" onClick={onAutoArrange}>
          Auto arrange
        </button>
      </div>

      <div className="hamper">
        <div className={`ribbon ribbon-${ribbon.toLowerCase()}`} />

        {selectedBox ? (
          <img
            src={selectedBox.image}
            alt={selectedBox.name}
            className="box-image"
            draggable="false"
          />
        ) : (
          <div className="empty-box">
            <span>✦</span>
            <p>Select a box to begin</p>
          </div>
        )}

        <div className="hamper-products" ref={productsRef}>
          {selectedProducts.map((item) => (
            <img
              key={item.uniqueId}
              src={item.image}
              alt={item.name}
              className="hamper-product"
              draggable="false"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                zIndex: item.zIndex || 1,
              }}
              onPointerDown={(event) => drag(event, item)}
            />
          ))}
        </div>
      </div>

      <p className="drag-hint">
        {selectedProducts.length
          ? "Drag each gift within the basket area to position it."
          : "Your selected gifts will appear here."}
      </p>
    </div>
  );
}