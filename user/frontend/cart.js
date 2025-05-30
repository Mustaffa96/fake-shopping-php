/**
 * Cart management functionality for the fake-shopping-php e-commerce system
 * 
 * Key features:
 * - Manages shopping cart UI and interactions
 * - Handles cart icon display with item count
 * - Supports add/update/delete cart items
 * - Shows product availability status
 * - Calculates total order value
 * - Integrates with cart.php backend
 * - Provides checkout flow integration
 * 
 * Currency: MYR (Malaysian Ringgit)
 * Max quantity per item: 10 or available stock
 */

const cartIcon = document.querySelector(".cart");
const localCart = {
  cart: null,
  length: 0,
  total: 0.0,
};
cartIcon.addEventListener("click", showCart);
function updateCart() {
  fetchCall("cart.php", responseUpdateCart);
}

function responseUpdateCart(data) {
  // console.log(data);
  const { total, ...cart } = data.cart;
  localCart.cart = cart;
  localCart.total = total;
  localCart.length = Object.keys(cart).length;
  if (localCart.length > 0) {
    cartIcon.classList.add("cart-not-empty");
    const rootCss = document.querySelector(":root");
    rootCss.style.setProperty("--cart-size", `'${localCart.length}'`);
  } else {
    cartIcon.classList.remove("cart-not-empty");
    // const rootCss = document.querySelector(":root");
    // rootCss.style.setProperty("--cart-size ", `'0'`);
  }
}

// add to cart logic
function addProductToCart() {
  console.log(this);
  const select = document.querySelector("select");
  console.log(select.value);
  const payload = new URLSearchParams();
  payload.append("id", this.id);
  payload.append("image", this.image);
  payload.append("price", this.price);
  payload.append("stock", this.stock);
  payload.append("quantity", select.value);
  fetchCall("cart.php", responseUpdateCart, "POST", payload);
}

function showCart() {
  // console.log('cart icon clicked')
  const main = document.querySelector("main");

  if (localCart.length <= 0) {
    if (main.children[0].classList.contains("cart-container"))
      location.replace(location.pathname);
    else alert("cart is empty");
    return;
  }

  setActiveCategory(null);
  
  // Clear any existing modals or overlays
  const existingModal = document.querySelector(".modal-container");
  const existingOverlay = document.querySelector(".overlay");
  if (existingModal) existingModal.remove();
  if (existingOverlay) existingOverlay.remove();
  
  main.innerHTML = "";
  const container = document.createElement("div");
  container.className = "cart-container";
  // img heading
  const imgHeading = document.createElement("div");
  imgHeading.textContent = "Item";
  container.appendChild(imgHeading);
  // quantity heading
  const quantityHeading = document.createElement("div");
  quantityHeading.textContent = "Quantity";
  container.appendChild(quantityHeading);
  // availability heading
  const availabilityHeading = document.createElement("div");
  availabilityHeading.textContent = "Availability";
  container.appendChild(availabilityHeading);
  // order heading
  const orderValHeading = document.createElement("div");
  orderValHeading.textContent = "Order Value";
  container.appendChild(orderValHeading);
  for (const [id, product] of Object.entries(localCart.cart)) {
    const { image, price, quantity, stock } = product;
    // img Div
    const imgDiv = document.createElement("div");
    const imgElm = document.createElement("img");
    imgElm.src = `http://localhost:8080/${image}`;
    imgDiv.appendChild(imgElm);
    container.appendChild(imgDiv);

    // quantity div
    const quantDiv = document.createElement("div");
    const select = document.createElement("select");
    select.addEventListener("change", updateQuantity.bind(id));
    const counter = stock > 10 ? 10 : stock;
    for (let i = 1; i <= counter; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      if (i === +quantity) option.setAttribute("selected", "");
      select.appendChild(option);
    }
    quantDiv.appendChild(select);
    container.appendChild(quantDiv);

    // availability Div
    const stockDiv = document.createElement("div");
    switch (true) {
      case stock > 10:
        stockDiv.textContent = "In Stock";
        stockDiv.style.color = "green";
        break;
      case stock > 0 && stock <= 10:
        stockDiv.textContent = `only ${stock} left`;
        stockDiv.style.color = "green";
        break;
      case stock == 0:
        stockDiv.textContent = "Out of Stock";
        stockDiv.style.color = "red";
        break;
      default:
        stockDiv.textContent = "Not Sure";
        break;
    }
    container.appendChild(stockDiv);
    // price per product Div
    const priceDiv = document.createElement("div");
    priceDiv.textContent = `RM${price}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-product-btn";
    deleteBtn.addEventListener("click", deleteProduct.bind(id));
    deleteBtn.textContent = "Delete";
    priceDiv.appendChild(deleteBtn);
    container.appendChild(priceDiv);
  }
  // total price Div
  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.textContent = `Total: RM${localCart.total}`;
  container.appendChild(totalDiv);

  // navigation Div
  const navDiv = document.createElement("div");
  navDiv.className = "nav-div";
  // Continue Shopping Button
  const continueShoppingBtn = document.createElement("button");
  continueShoppingBtn.className = "continue-shopping-btn";
  continueShoppingBtn.textContent = "Continue Shopping";
  navDiv.appendChild(continueShoppingBtn);
  // Checkout Button
  const checkoutBtn = document.createElement("button");
  checkoutBtn.className = "checkout-btn";
  checkoutBtn.textContent = "Checkout";
  checkoutBtn.addEventListener('click', checkout);
  navDiv.appendChild(checkoutBtn);

  container.appendChild(navDiv);
  main.appendChild(container);
}

function updateQuantity(e) {
  // console.log(e.target.value);
  const payload = new URLSearchParams();
  payload.append("quantity", e.target.value);
  payload.append("id", this);

  fetchCall("cart.php", responseModifyCart, "PATCH", payload);
}

// update cart after quantity change
function responseModifyCart(data) {
  responseUpdateCart(data);
  showCart();
}

// delete product from cart
function deleteProduct() {
  // console.log(this);
  const payload = new URLSearchParams();
  payload.append("id", this);
  fetchCall("cart.php", responseModifyCart, "DELETE", payload);
  showCart();
}
