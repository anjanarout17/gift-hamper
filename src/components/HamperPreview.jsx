import { useRef } from "react";

function HamperPreview({
  selectedBox,
  selectedProducts,
  onPositionChange,
  onBringToFront,
}) {
  const hamperRef = useRef(null);

  function handlePointerDown(event, product) {
    event.preventDefault();

    // Immediately bring selected item to front
    onBringToFront(product.uniqueId);

    const hamper = hamperRef.current;

    if (!hamper) return;

    const rect =
      hamper.getBoundingClientRect();

    const startX = event.clientX;
    const startY = event.clientY;

    const originalX = product.x;
    const originalY = product.y;

    function handlePointerMove(moveEvent) {
      const deltaX =
        moveEvent.clientX - startX;

      const deltaY =
        moveEvent.clientY - startY;

      const newX =
        originalX +
        (deltaX / rect.width) * 100;

      const newY =
        originalY +
        (deltaY / rect.height) * 100;

      // Keep item inside hamper
      const limitedX = Math.max(
        5,
        Math.min(95, newX)
      );

      const limitedY = Math.max(
        5,
        Math.min(90, newY)
      );

      onPositionChange(
        product.uniqueId,
        limitedX,
        limitedY
      );
    }

    function handlePointerUp() {
      document.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.removeEventListener(
        "pointerup",
        handlePointerUp
      );
    }

    document.addEventListener(
      "pointermove",
      handlePointerMove
    );

    document.addEventListener(
      "pointerup",
      handlePointerUp
    );
  }

  return (
    <div className="preview-container">

      <h2>Your Hamper</h2>

      <div
        className="hamper"
        ref={hamperRef}
      >

        {selectedBox ? (
          <img
            src={selectedBox.image}
            alt={selectedBox.name}
            className="box-image"
            draggable="false"
          />
        ) : (
          <div className="empty-box">
            <p>Select a box</p>
          </div>
        )}

        <div className="hamper-products">

          {selectedProducts.map((item) => (

            <img
              key={item.uniqueId}

              src={item.image}

              alt={item.name}

              className="hamper-product draggable-product"

              draggable="false"

              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                zIndex: item.zIndex || 1,
              }}

              onPointerDown={(event) =>
                handlePointerDown(
                  event,
                  item
                )
              }
            />

          ))}

        </div>

      </div>

      {selectedProducts.length > 0 && (
        <p className="drag-hint">
          Drag any item to arrange your hamper
        </p>
      )}

    </div>
  );
}

export default HamperPreview;