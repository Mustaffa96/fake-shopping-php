document.addEventListener("DOMContentLoaded", requestCategories);
document.addEventListener("DOMContentLoaded", requestBanners);
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
        console.log("No categories found in response:", data);
      }
    })
    .catch((err) => {
      console.error("Error fetching categories:", err);
      const nav = document.querySelector(".navigation");
      nav.innerHTML = "<p>Error loading categories</p>";
    });
}

function getCategoryProducts() {
  console.log("cate clicked");
}

function requestBanners() {
  fetch("http://localhost:8080/user/backend/banner.php", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.banners) {
        const banners = data.banners;
        banners.forEach((banner) => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.style.backgroundImage = `url('http://localhost:8080/${banner.image}')`;
          slide.style.height = "45vh";
          slide.style.backgroundSize = "cover";
          const h3 = document.createElement("h3");
          h3.textContent = banner.name;
          const p = document.createElement("p");
          p.textContent = banner.description;
          const button = document.createElement("button");
          button.textContent = "Shop Now";
          slide.appendChild(h3);
          slide.appendChild(p);
          slide.appendChild(button);
          const swiperWrapper = document.querySelector(".swiper-wrapper");
          swiperWrapper.appendChild(slide);
        });
        callCarousal();
      }
    })
    .catch((err) => console.log(err));
}

function callCarousal(){
  const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
}