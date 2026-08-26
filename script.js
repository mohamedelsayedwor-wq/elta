const products = [
  {color:"white", price:"$10,000", old:"$15,000", tagline:"Dress Better.<br>Feel Better."},
  {color:"pink", price:"$12,000", old:"$17,000", tagline:"Stand Out.<br>Own Your Style."},
  {color:"black", price:"$11,000", old:"$16,000", tagline:"Simple.<br>Sharp. Timeless."}
];

const shirt = document.querySelector("#shirt");
const price = document.querySelector("#price");
const oldPrice = document.querySelector("#oldPrice");
const tagline = document.querySelector("#tagline");
const counter = document.querySelector("#counter");
const thumbs = [...document.querySelectorAll(".thumb")];
let current = 0;

function show(index){
  current = (index + products.length) % products.length;
  const p = products[current];

  shirt.className = `shirt ${p.color}`;
  shirt.style.opacity = "0";
  shirt.style.transform = "translateY(18px) scale(.94)";
  setTimeout(()=>{
    shirt.style.opacity = "1";
    shirt.style.transform = "translateY(0) scale(1)";
  },80);

  price.textContent = p.price;
  oldPrice.textContent = p.old;
  tagline.innerHTML = p.tagline;
  counter.textContent = String(current + 1).padStart(2,"0");

  thumbs.forEach((t,i)=>t.classList.toggle("active", i===current));
}

document.querySelector(".next").addEventListener("click", ()=>show(current+1));
document.querySelector(".prev").addEventListener("click", ()=>show(current-1));
thumbs.forEach((t,i)=>t.addEventListener("click", ()=>show(i)));

document.querySelectorAll(".sizes button").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".sizes button").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

document.addEventListener("keydown", e=>{
  if(e.key==="ArrowRight") show(current+1);
  if(e.key==="ArrowLeft") show(current-1);
});

show(0);
