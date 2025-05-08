document.addEventListener("DOMContentLoaded", requestCategories);
function requestCategories() {
  fetch("http://localhost:8080/user/backend/menu.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Keep this log to help debug the response
      const nav = document.querySelector(".navigation");
      if (data.categories) {
        const ul = document.createElement("ul");
        data.categories.forEach((cat) => {
          const li = document.createElement("li");
          li.className = cat;
          li.textContent = cat; // Add this line to display the category name
          li.addEventListener("click", getCategoryProducts);
          ul.appendChild(li);
        });
        nav.append(ul);
      } else {
        console.log('No categories found in response:', data);
      }
    })
    .catch((err) => {
      console.error('Error fetching categories:', err);
      const nav = document.querySelector(".navigation");
      nav.innerHTML = '<p>Error loading categories</p>';
    });
}

function getCategoryProducts() {
  console.log("cate clicked");
}
