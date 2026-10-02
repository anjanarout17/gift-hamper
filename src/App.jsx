import { useState } from "react";

import { boxes, products } from "./data/products";

import ProductSection from "./components/ProductSection";
import HamperPreview from "./components/HamperPreview";
import Summary from "./components/Summary";

import "./App.css";

function App() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  function selectBox(box) {
    setSelectedBox(box);
  }

  // Add ONE physical item to the hamper
  function addProduct(product) {
    setSelectedProducts((current) => {
      const highestZIndex =
        current.length > 0
          ? Math.max(
              ...current.map(
                (item) => item.zIndex || 1
              )
            )
          : 0;

      const newItem = {
        ...product,

        // Unique ID for every physical item
        uniqueId:
          `${product.id}-${Date.now()}-${Math.random()}`,

        // Starting position
        x: 30 + (current.length % 4) * 18,
        y: 35 + (current.length % 3) * 18,

        // New item comes to front
        zIndex: highestZIndex + 1,
      };

      return [...current, newItem];
    });
  }

  // Remove ONE physical item
  function removeProduct(product) {
    setSelectedProducts((current) => {
      const index = current.findIndex(
        (item) => item.id === product.id
      );

      if (index === -1) {
        return current;
      }

      const updated = [...current];

      updated.splice(index, 1);

      return updated;
    });
  }

  // Move item and bring it to front
  function updateProductPosition(
    uniqueId,
    x,
    y
  ) {
    setSelectedProducts((current) => {
      const highestZIndex =
        current.length > 0
          ? Math.max(
              ...current.map(
                (item) => item.zIndex || 1
              )
            )
          : 0;

      return current.map((item) =>
        item.uniqueId === uniqueId
          ? {
              ...item,
              x,
              y,
              zIndex: highestZIndex + 1,
            }
          : item
      );
    });
  }

  // Bring an item to front without moving it
  function bringToFront(uniqueId) {
    setSelectedProducts((current) => {
      const highestZIndex =
        current.length > 0
          ? Math.max(
              ...current.map(
                (item) => item.zIndex || 1
              )
            )
          : 0;

      return current.map((item) =>
        item.uniqueId === uniqueId
          ? {
              ...item,
              zIndex: highestZIndex + 1,
            }
          : item
      );
    });
  }

  function resetHamper() {
    setSelectedBox(null);
    setSelectedProducts([]);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Build Your Own Hamper</h1>

        <p>
          Create a personalised gift hamper
        </p>
      </header>

      <main className="main-container">

        <div className="selection-area">

          <h2>1. Choose Your Box</h2>

          <div className="box-grid">
            {boxes.map((box) => (
              <div
                key={box.id}
                className={`box-card ${
                  selectedBox?.id === box.id
                    ? "selected"
                    : ""
                }`}
                onClick={() => selectBox(box)}
              >
                <img
                  src={box.image}
                  alt={box.name}
                />

                <h3>{box.name}</h3>

                <p>₹{box.price}</p>
              </div>
            ))}
          </div>

          <ProductSection
            title="2. Add Products"
            products={products}
            selectedProducts={selectedProducts}
            onAdd={addProduct}
            onRemove={removeProduct}
          />

        </div>

        <div className="right-area">

          <HamperPreview
            selectedBox={selectedBox}
            selectedProducts={selectedProducts}
            onPositionChange={
              updateProductPosition
            }
            onBringToFront={
              bringToFront
            }
          />

          <Summary
            selectedBox={selectedBox}
            selectedProducts={selectedProducts}
            onReset={resetHamper}
          />

        </div>

      </main>
    </div>
  );
}

export default App;