/**
 * Menu handling script for the fake shopping website
 * Manages category navigation and product display
 */

document.addEventListener("DOMContentLoaded", requestCategories);

/**
 * Fetches product categories from the server and creates navigation menu
 */
function requestCategories() {
  fetchCall("menu.php", ResponseCategories);
  function ResponseCategories(data) {
    const nav = document.querySelector(".navigation");
    if (data.categories) {
      const ul = document.createElement("ul");
      data.categories.forEach((cat) => {
        const li = document.createElement("li");
        li.className = cat;
        li.textContent = cat; // Add this line to display the category name
        li.addEventListener("click", getCategoryProducts.bind(cat));
        ul.appendChild(li);
      });
      nav.append(ul);
    }
  }
}

/**
 * Handles category selection and fetches products for the selected category
 * Updates the main content area with products from the selected category
 */
function getCategoryProducts() {
  const cat = this;
  const main = document.querySelector("main");
  setActiveCategory(cat);
  fetchCall(`product.php?category=${cat}`, responseCategoryProducts);
  function responseCategoryProducts(data) {
    if (data.products) {
      main.innerHTML = ""; // Clear the main section
      populateCatalogue(data.products, main);
    }
  }
}

/**
 * Updates the visual state of category navigation
 * Highlights the selected category with primary color and removes highlight from others
 * @param {string} cat - The selected category name
 */
function setActiveCategory(cat) {
  const categoryList = document.querySelectorAll(".navigation li");
  const root = document.querySelector(":root");
  const primaryColor = window
    .getComputedStyle(root)
    .getPropertyValue("--primary-color");
  console.log(primaryColor);

  categoryList.forEach((category) => {
    if (category.classList.contains(cat)) {
      category.style.backgroundColor = primaryColor;
    } else category.style.backgroundColor = "transparent";
  });
}