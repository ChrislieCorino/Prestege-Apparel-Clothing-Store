const PRODUCTS = [
  {id:1, title:'Noble Wool Blazer', category:'Formal', price:750, img:'images/noblewoolblazer.webp'},
  {id:2, title:'Oxford White Shirt', category:'Formal', price:500, img:'images/o3.jpg'},
  {id:3, title:'Khaki Chinos', category:'Casual', price:650, img:'images/khakichinos.webp'},
  {id:4, title:'Cashmere Crew Grey Sweater', category:'Old Money', price:300, img:'images/cashmere.webp'},
  {id:5, title:'Black Two Piece Suit', category:'Formal', price:2500, img:'images/s1.jpg'},
  {id:6, title:'Karl Lagerfeld Sneakers', category:'Casual', price:800, img:'images/karllagerfeld.jpg'},
  {id:7, title:'Black Shoes', category:'Formal', price:800, img:'images/shoes1.jpg'},
  {id:8, title:'Two Piece Brown Shirt & White Pants', category:'Old Money', price:1200, img:'images/o2.jpg'},
  {id:9, title:'Brown Two Piece Suit', category:'Formal', price:1000, img:'images/s2.jpg'},
  {id:10, title:'Black Three Piece Suit', category:'Formal', price:2800, img:'images/s3.jpg'},
  {id:11, title:'Black Leather Jacket', category:'Casual', price:850, img:'images/blackleatherjacket.webp'},
  {id:12, title:'Khaki Coat', category:'Casual', price:550, img:'images/khakicoat.webp'},
  {id:13, title:'Black & White Two Piece Suit', category:'Formal', price:850, img:'images/blackandwhitetwopiece.webp'},
  {id:14, title:'Tom Ford Grey Cardigan', category:'Old Money', price:500, img:'images/tomfordgreycardigan.webp'},
  {id:15, title:'Ralph Lauren White Shirt', category:'Old Money', price:300, img:'images/ralphlauren.webp'},
  {id:16, title:'White Blazer Suit', category:'Formal', price:2800, img:'images/whiteblazersuit.webp'},
  {id:17, title:'Suede Loafers', category:'Old Money', price:900, img:'images/suedeloafers.webp'},
  {id:18, title:'White Polo Ralph Lauren Golf Shirt', category:'Casual', price:780, img:'images/poloralphlauren.webp'},
  {id:19, title:'Tuxedo', category:'Formal', price:1200, img:'images/tuxedo.jpg'},
  {id:20, title:'Alexander McQueen shoes (All colours)', category:'Casual', price:10500, img:'images/alexandermcqueen.webp'}
];

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="card">
      <img src="${p.img}" alt="${p.title}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;">
      <h3>${p.title}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: R${p.price}</p>
      <button class="add-to-cart" onclick="addToCart(${p.id})"><font color = "black">Add to Cart</font></button>
      <button class="add-to-wishlist" onclick="addToWishlist(${p.id})"><font color = "black">Add to Wishlist</font></button>
    </div>
  `).join('');
}

function filterBy(category) {
  const filtered = category === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = filtered.map(p => `
    <div class="card">
      <img src="${p.img}" alt="${p.title}" style="width:100%; height:200px; object-fit:cover; border-radius:8px;">
      <h3>${p.title}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: R${p.price}</p>
      <button class="add-to-cart" onclick="addToCart(${p.id})"><font color = "black">Add to Cart</font></button>
      <button class="add-to-wishlist" onclick="addToCart(${p.id})"><font color = "black">Add to Wishlist</font></button>
    </div>
  `).join('');
}



renderProducts();

/***********************************************wishlist & cart**********************************************************/
 let wishlist = [];
 let cart = [];
 const wishlistDisplay = document.getElementById("wishlist-count");
 const cartDisplay = document.getElementById("cart-count");
 const wishlistSection = document.getElementById("wishlist-section");
 const cartSection = document.getElementById("cart-section");
 const wishlistItems = document.getElementById("wishlist-items");
 const cartItems = document.getElementById("cart-items");
 const cartTotal = document.getElementById("cart-total");
 
 // Add to wishlist
 document.querySelectorAll(".add-to-wishlist").forEach(button => {
  button.addEventListener("click", e => {
    const productCard = e.target.closest(".card");
    const name = productCard.querySelector("h3").textContent;
    const price = productCard.querySelector("p:nth-of-type(2)").textContent.replace("Price: R", "");
    wishlist.push({ name, price });
    wishlistDisplay.textContent = wishlist.length;
    alert(`${name} added to wishlist!`);
    updateWishlist();
  });
 });

 // Add to cart
 document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", e => {
    const productCard = e.target.closest(".card");
    const name = productCard.querySelector("h3").textContent;
    const price = productCard.querySelector("p:nth-of-type(2)").textContent.replace("Price: R", "");
    cart.push({ name, price });
    cartDisplay.textContent = cart.length;
    alert(`${name} added to cart!`);
    updateCart();
  });
 });

 // Update Wishlist display
 function updateWishlist() {
  wishlistItems.innerHTML = "";
  wishlist.forEach((item, index) => {
    wishlistItems.innerHTML += `
      <div class="item-card">
        <h3>${item.name}</h3>
        <p>Price: R${item.price}</p>
        <button onclick="removeFromWishlist(${index})">Remove</button>
      </div>
    `;
  });
 }

 // Update Cart display and total
 function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += parseFloat(item.price);
    cartItems.innerHTML += `
      <div class="item-card">
        <h3>${item.name}</h3>
        <p>Price: R${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });
  cartTotal.textContent = total.toFixed(2);
 }

 // Remove functions
 function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  wishlistDisplay.textContent = wishlist.length;
  updateWishlist();
 }
 function removeFromCart(index) {
  cart.splice(index, 1);
  cartDisplay.textContent = cart.length;
  updateCart();
 }

 // Navigation buttons
 document.getElementById("wishlist-btn").addEventListener("click", () => {
  wishlistSection.classList.toggle("hidden");
  cartSection.classList.add("hidden");
 });
 document.getElementById("cart-btn").addEventListener("click", () => {
  cartSection.classList.toggle("hidden");
  wishlistSection.classList.add("hidden");
 });


/******************************sign in & login*************************************/

function log(){
  alert('Login succesfull!!!');
}

function sign(){
  alert('Sign in successful!!!');
}