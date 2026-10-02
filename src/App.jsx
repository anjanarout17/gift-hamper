import { useMemo, useState } from "react";
import { business, categories, catalogue } from "./data/catalog";
import "./App.css";

const types = ["Hampers", "Personalised Gifts", "Photo Gifts", "Home Decor", "Corporate"];

export default function App() {
  const [menu, setMenu] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const filtered = useMemo(() => catalogue.filter(p => {
    const q = search.toLowerCase().trim();
    return (menu === "All" || p.category === menu) &&
      (!q || `${p.name} ${p.category} ${p.short} ${p.includes.join(" ")}`.toLowerCase().includes(q));
  }), [menu, search]);

  const whatsapp = (text) => window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");

  const order = (p) => whatsapp(["Hello! I would like to order:", `Product: ${p.name}`, `Price: ₹${p.price}`, `Category: ${p.category}`, "", "Please share availability and delivery details."].join("\n"));

  const custom = () => {
    whatsapp(["Hello! I would like a customised gift.", "", "Occasion: ______", "Budget: ______", "Preferred colours/theme: ______", "Personalisation: ______", "Special requirements: ______"].join("\n"));
    setCustomOpen(false);
  };

  return <div className="store">
    <button className="announcement" onClick={()=>{setMenu("Festive");document.querySelector("#shop")?.scrollIntoView({behavior:"smooth"})}}>🪔 <strong>DIWALI COLLECTION IS LIVE NOW</strong> <span>•</span> Shop festive gifting <span>•</span> Easy WhatsApp ordering</button>

    <header className="header">
      <a className="logo" href="#home">{business.name}<small>made with care</small></a>
      <nav className="main-nav">
        <a href="#home">Home</a>
        <div className="nav-dropdown"><button>Shop <span>⌄</span></button><div className="dropdown"><strong>Shop by occasion</strong>{categories.filter(x=>x!=="All").map(x=><button key={x} onClick={()=>{setMenu(x);document.querySelector("#shop")?.scrollIntoView()}}>{x}</button>)}<strong>Shop by type</strong>{types.map(x=><button key={x}>{x}</button>)}</div></div>
        <a href="#shop">Collections</a><a href="#about">Our story</a><a href="#custom">Custom gifts</a>
      </nav>
      <div className="header-actions">
        <button aria-label="Search" onClick={()=>setSearchOpen(!searchOpen)}>⌕</button>
        <button aria-label="Account">♙</button>
        <button aria-label="Cart" onClick={()=>setCustomOpen(true)}>♡ <sup>{cartCount}</sup></button>
      </div>
    </header>

    {searchOpen && <div className="search-bar"><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search gifts, hampers, occasions..." /><button onClick={()=>{setSearch("");setSearchOpen(false)}}>×</button></div>}

    <main id="home">
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow">CURATED · PERSONAL · MEMORABLE</span><h1>Make their moment<br/><i>extra special.</i></h1><p>Beautiful gifts and thoughtful hampers, curated for the people and occasions that matter most.</p><div><a className="button dark" href="#shop">Shop gifts</a><button className="button light" onClick={()=>setCustomOpen(true)}>Create something custom</button></div><div className="trust-strip"><span>✓ Curated with care</span><span>✓ Custom gifting</span><span>✓ WhatsApp ordering</span></div></div>
        <div className="hero-showcase">
          <div className="hero-main-photo"><img src="/images/main-image.png" alt="Main gift hamper" /></div>
          <div className="hero-float hero-float-one"><img src="/images/left-image.png" alt="Featured gift" /></div>
          <div className="hero-float hero-float-two"><img src="/images/right-image.png" alt="Featured gift" /></div>
          <span className="hero-badge">FEATURED<br/><strong>GIFTING</strong></span>
        </div>
      </section>

      <section className="quick-links"><button onClick={()=>setMenu("Birthday")}>Birthday <span>→</span></button><button onClick={()=>setMenu("Anniversary")}>Anniversary <span>→</span></button><button onClick={()=>setMenu("Wedding")}>Wedding <span>→</span></button><button onClick={()=>setMenu("Festive")}>Diwali <span>→</span></button><button onClick={()=>setCustomOpen(true)}>Custom <span>→</span></button></section>

      <section className="collection-section" id="shop">
        <div className="section-head"><div><span className="eyebrow">SHOP THE COLLECTION</span><h2>Gifts for every little story</h2><p className="section-subtitle">Beautifully curated hampers, ready to make someone smile.</p></div><button onClick={()=>setMenu("All")}>View all →</button></div>
        <div className="filter-row">{categories.map(c=><button className={menu===c?"active":""} key={c} onClick={()=>setMenu(c)}>{c}</button>)}</div>
        <div className="product-grid">{filtered.map(p=><article className="product" key={p.id}>
          <button className="product-photo" onClick={()=>setProduct(p)}><img src={p.image} alt={p.name}/><span className="heart">♡</span>{p.category==="Festive"&&<b>NEW</b>}</button>
          <div className="product-copy"><span>{p.category}</span><h3>{p.name}</h3><p>₹{p.price.toLocaleString("en-IN")}</p><button onClick={()=>{setCartCount(x=>x+1);order(p)}}>Order on WhatsApp</button></div>
        </article>)}</div>
        {!filtered.length&&<div className="empty">No gifts found. <button onClick={()=>setCustomOpen(true)}>Ask us to create one →</button></div>}
      </section>

      <section className="story" id="about">
        <div className="story-art"><div>✦</div><span>MADE FOR<br/>YOUR STORY</span></div>
        <div><span className="eyebrow">A LITTLE ABOUT US</span><h2>Not just a gift.<br/><i>A memory in a box.</i></h2><p>{business.description} Every order can be adapted to your recipient, your colours and your budget.</p><button className="button dark" onClick={()=>setCustomOpen(true)}>Tell us your idea</button></div>
      </section>

      <section className="custom" id="custom"><div><span className="eyebrow">HAVE SOMETHING ELSE IN MIND?</span><h2>Tell us the story.<br/><i>We'll craft the gift.</i></h2><p>Share your occasion, budget, theme or even a reference photo. We'll take it from there.</p></div><button className="button cream" onClick={()=>setCustomOpen(true)}>Request a custom gift →</button></section>

      <section className="reviews"><span className="eyebrow">LOVE NOTES</span><h2>Made to make someone smile.</h2><div className="review-grid"><blockquote>“The hamper looked even better than I imagined. Such beautiful finishing.”<small>— Happy customer</small></blockquote><blockquote>“I gave them my budget and theme and they did the rest. Loved it.”<small>— Happy customer</small></blockquote><blockquote>“The personalised touch made the gift feel truly special.”<small>— Happy customer</small></blockquote></div></section>
    </main>

    <footer><div><a className="logo" href="#home">{business.name}<small>made with care</small></a><p>{business.tagline}</p></div><div><strong>Shop</strong><a href="#shop">All gifts</a><a href="#shop">By occasion</a><a href="#custom">Custom gifts</a></div><div><strong>Help</strong><a href="#custom">Contact us</a><a href="#custom">WhatsApp</a><a href="#about">Our story</a></div><div><strong>Follow</strong><a href={business.instagram || "#"}>Instagram</a><a href="#home">Pinterest</a></div></footer>

    {product&&<div className="overlay" onMouseDown={()=>setProduct(null)}><div className="product-modal" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={()=>setProduct(null)}>×</button><img src={product.image} alt={product.name}/><div><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><p>{product.short}</p><strong className="modal-price">₹{product.price.toLocaleString("en-IN")}</strong><h4>Includes</h4><ul>{product.includes.map(x=><li key={x}>{x}</li>)}</ul><button className="button dark full" onClick={()=>order(product)}>Order this gift →</button><button className="text-link" onClick={()=>{setProduct(null);setCustomOpen(true)}}>Need changes? Request customisation</button></div></div></div>}

    {customOpen&&<div className="overlay" onMouseDown={()=>setCustomOpen(false)}><div className="custom-modal" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={()=>setCustomOpen(false)}>×</button><span className="eyebrow">CUSTOM GIFTING</span><h2>Let's make it personal.</h2><p>We'll collect the details on WhatsApp and help you build the right gift.</p><div className="custom-form"><input placeholder="Occasion"/><input placeholder="Budget (e.g. ₹1500)"/><input placeholder="Colours / theme"/><input placeholder="Recipient / relationship"/><textarea placeholder="What would you like included? Any special message or requirements?"/></div><button className="button dark full" onClick={custom}>Continue on WhatsApp →</button></div></div>}
  </div>;
}
