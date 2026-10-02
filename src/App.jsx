import { useMemo, useState } from "react";
import { business, categories, catalogue } from "./data/catalog";
import "./App.css";

export default function App() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState({ occasion: "Birthday", budget: "", colours: "", message: "", requirements: "" });

  const filtered = useMemo(() => catalogue.filter(item => {
    const matchesCategory = category === "All" || item.category === category;
    const text = `${item.name} ${item.category} ${item.short} ${item.includes.join(" ")}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase().trim());
  }), [category, query]);

  function orderProduct(product) {
    const text = [
      "Hello! I would like to order a gift hamper.",
      "",
      `Product: ${product.name}`,
      `Price: ₹${product.price}`,
      `Category: ${product.category}`,
      "",
      `Please let me know the next steps.`,
    ].join("\n");
    window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  function sendCustomRequest() {
    const text = [
      "Hello! I would like a customised gift hamper.",
      "",
      `Occasion: ${custom.occasion}`,
      `Budget: ${custom.budget || "Not specified"}`,
      `Preferred colours: ${custom.colours || "Not specified"}`,
      `Message for recipient: ${custom.message || "Not specified"}`,
      `Special requirements: ${custom.requirements || "Not specified"}`,
    ].join("\n");
    window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setCustomOpen(false);
  }

  return (
    <div className="site">
      <header className="nav">
        <a className="brand" href="#top">{business.name}</a>
        <nav>
          <a href="#catalogue">Catalogue</a>
          <a href="#custom">Custom Hampers</a>
          <button className="nav-button" onClick={() => setCustomOpen(true)}>Message us</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">CURATED GIFTS · PERSONAL TOUCH</span>
            <h1>Gifts that feel <em>made for them.</em></h1>
            <p>{business.description}</p>
            <div className="hero-actions">
              <a className="primary" href="#catalogue">Explore hampers</a>
              <button className="secondary" onClick={() => setCustomOpen(true)}>Create a custom gift</button>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-sparkle">✦</div>
            <span>THIS SEASON</span>
            <strong>Curated gifting<br />without the guesswork.</strong>
            <p>Choose a ready-made hamper or tell us what you have in mind.</p>
          </div>
        </section>

        <section className="trust-strip">
          <span>✓ Personalised requests</span><span>✓ Gift-ready packaging</span><span>✓ Easy WhatsApp ordering</span>
        </section>

        <section className="catalogue" id="catalogue">
          <div className="section-title">
            <div><span className="eyebrow">OUR COLLECTION</span><h2>Shop ready-made hampers</h2></div>
            <div className="search-wrap"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search hampers..." aria-label="Search hampers" /></div>
          </div>
          <div className="categories">{categories.map(item => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
          <div className="catalog-grid">
            {filtered.map(product => (
              <article className="catalog-card" key={product.id}>
                <button className="product-image" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}>
                  <img src={product.image} alt={product.name} />
                  <span>{product.category}</span>
                </button>
                <div className="catalog-info">
                  <h3>{product.name}</h3>
                  <p>{product.short}</p>
                  <div className="card-bottom"><strong>₹{product.price.toLocaleString("en-IN")}</strong><button onClick={() => orderProduct(product)}>Order on WhatsApp</button></div>
                </div>
              </article>
            ))}
          </div>
          {!filtered.length && <div className="empty-state">No hampers match your search. Try another category or ask us for a custom gift.</div>}
        </section>

        <section className="custom-banner" id="custom">
          <div><span className="eyebrow">CAN'T FIND EXACTLY WHAT YOU WANT?</span><h2>Tell us what you’re imagining.</h2><p>Share your budget, occasion, colours and special requirements. We’ll suggest a hamper around it.</p></div>
          <button className="primary" onClick={() => setCustomOpen(true)}>Request a custom hamper →</button>
        </section>
      </main>

      <footer><span>{business.name}</span><span>{business.tagline}</span></footer>

      {selected && <div className="modal-backdrop" onMouseDown={() => setSelected(null)}><div className="modal product-modal" onMouseDown={e => e.stopPropagation()}>
        <button className="close" onClick={() => setSelected(null)}>×</button>
        <img src={selected.image} alt={selected.name} />
        <div><span className="eyebrow">{selected.category}</span><h2>{selected.name}</h2><p>{selected.short}</p><h3>₹{selected.price.toLocaleString("en-IN")}</h3><h4>What's included</h4><ul>{selected.includes.map(x => <li key={x}>{x}</li>)}</ul><button className="primary full" onClick={() => orderProduct(selected)}>Order this hamper on WhatsApp</button><button className="text-button" onClick={() => { setSelected(null); setCustomOpen(true); }}>Need changes? Request customisation</button></div>
      </div></div>}

      {customOpen && <div className="modal-backdrop" onMouseDown={() => setCustomOpen(false)}><div className="modal custom-modal" onMouseDown={e => e.stopPropagation()}>
        <button className="close" onClick={() => setCustomOpen(false)}>×</button>
        <span className="eyebrow">CUSTOM HAMPER REQUEST</span><h2>Let's make it yours.</h2><p>Tell us the basics and we’ll continue the conversation on WhatsApp.</p>
        <div className="form-grid">
          <label>Occasion<select value={custom.occasion} onChange={e => setCustom({...custom, occasion:e.target.value})}>{["Birthday","Anniversary","Wedding","Festive","Corporate","Other"].map(x => <option key={x}>{x}</option>)}</select></label>
          <label>Budget<input value={custom.budget} onChange={e => setCustom({...custom,budget:e.target.value})} placeholder="e.g. ₹1500" /></label>
          <label>Preferred colours<input value={custom.colours} onChange={e => setCustom({...custom,colours:e.target.value})} placeholder="e.g. Pink & gold" /></label>
          <label>Recipient message<input value={custom.message} onChange={e => setCustom({...custom,message:e.target.value})} placeholder="e.g. Happy birthday!" /></label>
          <label className="wide">Special requirements<textarea value={custom.requirements} onChange={e => setCustom({...custom,requirements:e.target.value})} placeholder="Items to include, items to avoid, theme, delivery date, etc." /></label>
        </div>
        <button className="primary full" onClick={sendCustomRequest}>Send request on WhatsApp →</button>
      </div></div>}
    </div>
  );
}
