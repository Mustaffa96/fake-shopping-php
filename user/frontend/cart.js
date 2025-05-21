function updateCart() {
  fetchCall("cart.php", responseUpdateCart);
}

function responseUpdateCart(data) {
  console.log(data);
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
