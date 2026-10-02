import { useMemo, useState } from "react";
import { boxes, products } from "./data/products";
import ProductSection from "./components/ProductSection";
import HamperPreview from "./components/HamperPreview";
import Summary from "./components/Summary";
import "./App.css";

export default function App() {
  const [selectedBox,setSelectedBox]=useState(null),[selectedProducts,setSelectedProducts]=useState([]);
  const [occasion,setOccasion]=useState("Birthday"),[message,setMessage]=useState(""),[ribbon,setRibbon]=useState("Gold");
  const addProduct=p=>setSelectedProducts(c=>{const e=c.find(x=>x.id===p.id);if(e)return c.map(x=>x.id===p.id?{...x,quantity:(Number(x.quantity)||0)+1}:x);const z=c.reduce((m,x)=>Math.max(m,Number(x.zIndex)||0),0);return[...c,{...p,quantity:1,uniqueId:`${p.id}-${Date.now()}-${Math.random()}`,x:20+(c.length%4)*20,y:28+(c.length%3)*20,zIndex:z+1}]});
  const removeProduct=p=>setSelectedProducts(c=>c.map(x=>x.id===p.id?{...x,quantity:Math.max(0,(Number(x.quantity)||0)-1)}:x).filter(x=>Number(x.quantity)>0));
  const updatePosition=(id,x,y)=>setSelectedProducts(c=>{const z=c.reduce((m,i)=>Math.max(m,Number(i.zIndex)||0),0);return c.map(i=>i.uniqueId===id?{...i,x,y,zIndex:z+1}:i)});
  const bringToFront=id=>setSelectedProducts(c=>{const z=c.reduce((m,i)=>Math.max(m,Number(i.zIndex)||0),0);return c.map(i=>i.uniqueId===id?{...i,zIndex:z+1}:i)});
  const autoArrange=()=>setSelectedProducts(c=>c.map((x,i)=>({...x,x:18+(i%4)*22,y:28+Math.floor(i/4)*25,zIndex:i+1})));
  const reset=()=>{setSelectedBox(null);setSelectedProducts([]);setOccasion("Birthday");setMessage("");setRibbon("Gold")};
  const count=useMemo(()=>selectedProducts.reduce((s,x)=>s+(Number(x.quantity)||0),0),[selectedProducts]);
  return <div className="app"><header className="header"><div className="eyebrow">CURATED GIFTING · MADE BY YOU</div><h1>Build Your <span>Perfect Hamper</span></h1><p>Choose a box, add thoughtful gifts, arrange them beautifully, and send your custom order on WhatsApp.</p></header>
  <main className="main-container"><section className="selection-area"><div className="section-heading"><span>01</span><div><h2>Choose your box</h2><p>Select the foundation for your gift.</p></div></div><div className="box-grid">{boxes.map(b=><button type="button" key={b.id} className={`box-card ${selectedBox?.id===b.id?"selected":""}`} onClick={()=>setSelectedBox(b)}><div className="choice-badge">{selectedBox?.id===b.id?"✓ Selected":"Choose"}</div><img src={b.image} alt={b.name}/><h3>{b.name}</h3><p>₹{(Number(b.price)||0).toLocaleString("en-IN")}</p></button>)}</div>
  <ProductSection title="02" products={products} selectedProducts={selectedProducts} onAdd={addProduct} onRemove={removeProduct}/>
  <div className="custom-card"><div className="section-heading"><span>03</span><div><h2>Make it personal</h2><p>Small details make a big difference.</p></div></div><div className="custom-grid"><label>Occasion<select value={occasion} onChange={e=>setOccasion(e.target.value)}>{["Birthday","Anniversary","Wedding","Thank You","Festive","Just Because"].map(x=><option key={x}>{x}</option>)}</select></label><label>Ribbon colour<select value={ribbon} onChange={e=>setRibbon(e.target.value)}>{["Gold","Ivory","Rose","Sage","Burgundy"].map(x=><option key={x}>{x}</option>)}</select></label><label className="message-field">Personal message<textarea maxLength="180" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write a little note for the recipient..."/><small>{message.length}/180</small></label></div></div></section>
  <aside className="right-area"><HamperPreview selectedBox={selectedBox} selectedProducts={selectedProducts} ribbon={ribbon} onPositionChange={updatePosition} onBringToFront={bringToFront} onAutoArrange={autoArrange}/><Summary selectedBox={selectedBox} selectedProducts={selectedProducts} occasion={occasion} message={message} ribbon={ribbon} itemCount={count} onReset={reset}/></aside></main></div>
}