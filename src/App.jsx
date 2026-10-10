import React, { useState, useEffect } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <h1>Amazon Product Store</h1>
      <p>Your favourite accessories, all in one place!</p>
    </header>
  );
}

function ProductCard({
  productName, price, quantity, color, city,
  onColorChange, onCityChange, onAdd, onRemove, onReset
}) {
  return (
    <section className="card">
      <div className="product-icon">🖱️</div>
      <h2>{productName}</h2>
      <h3 className="price">₹{price}</h3>

      <label>
        Choose Colour:
        <select value={color} onChange={(e) => onColorChange(e.target.value)}>
          <option value="Black">Black</option>
          <option value="Blue">Blue</option>
          <option value="White">White</option>
        </select>
      </label>

      <p>Selected Colour: <strong>{color}</strong></p>

      <label>
        Delivery City:
        <input
          type="text"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          placeholder="Enter delivery city"
        />
      </label>

      <p>Delivering to: <strong>{city || "Enter a city"}</strong></p>

      <div className="cart-info">
        <h3>Quantity: {quantity}</h3>
        <h2>Total: ₹{quantity * price}</h2>
        <p className={quantity === 0 ? "empty" : "success"}>
          {quantity === 0 ? "Cart is empty" : "Product added to cart"}
        </p>
      </div>

      <div className="buttons">
        <button className="add" onClick={onAdd}>Add to Cart</button>
        <button className="remove" onClick={onRemove} disabled={quantity === 0}>
          Remove One
        </button>
        <button className="reset" onClick={onReset}>Reset Cart</button>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="footer">© 2026 Amazon Product Store</footer>;
}

export default function App() {
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [deliveryCity, setDeliveryCity] = useState("Coimbatore");
  const [showProduct, setShowProduct] = useState(true);

  const productName = "Wireless Mouse";
  const price = 499;

  useEffect(() => {
    document.title = "Amazon Product Store";
    console.log("Cart quantity updated:", quantity);
  }, [quantity]);

  return (
    <div className="app">
      <Header />

      <main>
        <button
          className="toggle"
          onClick={() => setShowProduct((previous) => !previous)}
        >
          {showProduct ? "Hide Product" : "Show Product"}
        </button>

        {showProduct && (
          <ProductCard
            productName={productName}
            price={price}
            quantity={quantity}
            color={selectedColor}
            city={deliveryCity}
            onColorChange={setSelectedColor}
            onCityChange={setDeliveryCity}
            onAdd={() => setQuantity((q) => q + 1)}
            onRemove={() => setQuantity((q) => Math.max(0, q - 1))}
            onReset={() => setQuantity(0)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
