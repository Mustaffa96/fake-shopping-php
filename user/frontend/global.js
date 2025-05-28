document.addEventListener("DOMContentLoaded", requestCategories);
document.addEventListener("DOMContentLoaded", requestBanners);
document.addEventListener("DOMContentLoaded", requestFeatured);
document.addEventListener("DOMContentLoaded", requestNewArrivals);
document.addEventListener("DOMContentLoaded", checkLoginStatus);
document.addEventListener("DOMContentLoaded", updateCart);
document.addEventListener("DOMContentLoaded", showWelcomeModal);
document.addEventListener("DOMContentLoaded", initializeSearch);

function populateCatalogue(products, catalogueParent) {
  if (!products) return;

  const catalogue = document.createElement("div");
  catalogue.className = "catalogue";

  products.forEach((prod) => {
    const card = document.createElement("div");
    card.className = "card";
    card.addEventListener("click", getProductDetails.bind(prod));

    // Create card image container
    const imgDiv = document.createElement("div");
    imgDiv.className = "card-img";
    const img = document.createElement("img");
    img.src = `http://localhost:8080/${prod.image}`;
    img.alt = prod.name;
    img.loading = "lazy"; // Add lazy loading for better performance
    imgDiv.appendChild(img);

    // Create card description container
    const descDiv = document.createElement("div");
    descDiv.className = "card-description";

    // Add product name
    const nameP = document.createElement("p");
    nameP.className = "product-name";
    nameP.textContent = prod.name;

    // Add product price
    const priceP = document.createElement("p");
    priceP.className = "product-price";
    priceP.textContent = `RM ${parseFloat(prod.price).toFixed(2)}`;

    // Assemble the card
    descDiv.appendChild(nameP);
    descDiv.appendChild(priceP);
    card.appendChild(imgDiv);
    card.appendChild(descDiv);
    catalogue.appendChild(card);
  });

  catalogueParent.appendChild(catalogue);
}

// fetch request refactoring
function fetchCall(resource, callback, method = "GET", data = undefined) {
  const url = "http://localhost:8080/user/backend/";
  fetch(url + resource, {
    method: method,
    mode: "cors",
    credentials: "include",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    })
    .catch((err) => console.log(err));
}

function displayOverlay(modal) {
  const main = document.querySelector("main");
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.addEventListener("click", removeOverlay);
  main.appendChild(overlay);
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal-container";
  modalContainer.appendChild(modal);
  main.appendChild(modalContainer);
}

function getProductDetails() {
  console.log("Product clicked", this);
  // const main = document.querySelector("main");
  fetchCall(`inventory.php?id=${this.id}`, responseInventory.bind(this));
  function responseInventory(data) {
    // console.log(data);
    const stock = +data.stock;
    const modal = document.createElement("div");
    modal.className = "modal";
    const img = document.createElement("img");
    img.src = `http://localhost:8080/${this.image}`;
    modal.appendChild(img);
    const modalDesc = document.createElement("div");
    modalDesc.className = "modal-desc";
    modal.appendChild(modalDesc);
    const title = document.createElement("div");
    title.textContent = this.name;
    modalDesc.appendChild(title);
    const desc = document.createElement("div");
    desc.textContent = this.description;
    modalDesc.appendChild(desc);
    const price = document.createElement("div");
    price.textContent = `RM${this.price}`;
    modalDesc.appendChild(price);
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
    modalDesc.appendChild(stockDiv);
    const select = document.createElement("select");
    if (stock == 0) {
      select.disabled = true;
    } else {
      const counter = stock > 10 ? 10 : stock;
      for (let i = 1; i <= counter; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
      }
    }
    modalDesc.appendChild(select);
    const addToCart = document.createElement("button");
    addToCart.className = "add-to-cart";
    addToCart.textContent = "Add to Cart";
    addToCart.addEventListener(
      "click",
      addProductToCart.bind({
        id: this.id,
        image: this.image,
        price: this.price,
        stock,
      })
    );
    modalDesc.appendChild(addToCart);
    displayOverlay(modal);
  }
}

function removeOverlay() {
  // const main = document.querySelector("main");
  const overlay = document.querySelector(".overlay");
  const modalContainer = document.querySelector(".modal-container");
  if (overlay) {
    overlay.remove();
  }
  if (modalContainer) {
    modalContainer.remove();
  }
}

function showWelcomeModal() {
  const modal = document.createElement("div");
  modal.className = "modal welcome-modal";

  const modalContent = document.createElement("div");
  modalContent.className = "welcome-content";

  const title = document.createElement("h2");
  title.textContent = "Welcome to My Fake Shopping Online!";

  const message = document.createElement("p");
  message.innerHTML =
    "This is my personal project built with vanilla PHP & JavaScript. Please don't use your real email or password, including the payment information as this is a demo site. Feel free to explore and have fun!. For more projects, <a href='https://github.com/Mustaffa96' target='_blank' style='color: var(--primary-color); text-decoration: underline;'>visit my GitHub</a>";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Got it!";
  closeButton.className = "welcome-close-btn";
  closeButton.onclick = removeOverlay;

  modalContent.appendChild(title);
  modalContent.appendChild(message);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  displayOverlay(modal);
}

// function checkLoginStatus() {
//   fetchCall("login.php", responseUserLogin);
//   function responseUserLogin(data) {
//     console.log(data);
//   }
// }

function initializeSearch() {
  const searchForm = document.querySelector(".search-form");
  const searchInput = searchForm.querySelector('input[type="search"]');
  const main = document.querySelector("main");

  searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      fetchCall(`product.php?search=${encodeURIComponent(searchTerm)}`, displaySearchResults);
    }
  });
}

function displaySearchResults(data) {
  const main = document.querySelector("main");
  // Clear existing content
  main.innerHTML = "";
  
  // Create search results section
  const searchSection = document.createElement("div");
  searchSection.className = "search-results";
  
  const heading = document.createElement("h2");
  heading.textContent = "Search Results";
  searchSection.appendChild(heading);
  
  if (data.products && data.products.length > 0) {
    populateCatalogue(data.products, searchSection);
  } else {
    const noResults = document.createElement("p");
    noResults.textContent = "No products found.";
    noResults.style.textAlign = "center";
    noResults.style.padding = "2rem";
    searchSection.appendChild(noResults);
  }
  
  main.appendChild(searchSection);
}
