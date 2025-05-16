document.addEventListener("DOMContentLoaded", requestCategories);
document.addEventListener("DOMContentLoaded", requestBanners);
document.addEventListener("DOMContentLoaded", requestFeatured);
document.addEventListener("DOMContentLoaded", requestNewArrivals);
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
        li.addEventListener("click", getCategoryProducts);
        ul.appendChild(li);
      });
      nav.append(ul);
    }
  }
}

function getCategoryProducts() {
  console.log("cate clicked");
}

function requestBanners() {
  fetchCall("banner.php", ResponseBanners);
  function ResponseBanners(data) {
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
  }
}

// Request for featured products - Evenlistener
function requestFeatured() {
  fetchCall("featured.php", ResponseFeatured);
  function ResponseFeatured(data) {
    if (data.featured) {
      const featured = data.featured;
      const featuredSection = document.querySelector(".featured-products");
      populateCatalogue(featured, featuredSection);
    }
  }
}
//  End of Request for Featured products - eventlistener ends

// Request for new arrivals - starts
function requestNewArrivals() {
  fetchCall("newArrivals.php", ResponseNewArrivals);
  function ResponseNewArrivals(data) {
    if (data.newArrivals) {
      const newArrivals = data.newArrivals;
      const newArrivalSection = document.querySelector(".new-arrivals");
      populateCatalogue(newArrivals, newArrivalSection);
    }
  }
}
// Request for new arrivals - ends

function callCarousal() {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function populateCatalogue(products, catalogueParent) {
  if (products) {
    // const featuredSection = document.querySelector(".featured-products");
    const catalogue = document.createElement("div");
    catalogue.className = "catalogue";

    products.forEach((prod) => {
      const card = document.createElement("div");
      card.className = "card";
      const imgDiv = document.createElement("div");
      imgDiv.className = "card-img";
      const descDiv = document.createElement("div");
      descDiv.className = "card-description";
      card.appendChild(imgDiv);
      card.appendChild(descDiv);
      const img = document.createElement("img");
      img.src = `http://localhost:8080/${prod.image}`;
      imgDiv.appendChild(img);
      const nameP = document.createElement("p");
      nameP.className = "product-name";
      nameP.textContent = prod.name;
      const priceP = document.createElement("p");
      priceP.className = "product-price";
      priceP.textContent = `Price: RM${prod.price}`;
      descDiv.appendChild(nameP);
      descDiv.appendChild(priceP);
      catalogue.appendChild(card);
    });
    catalogueParent.appendChild(catalogue);
  }
}

// fetch request refactoring
function fetchCall(resource, callback, method = "GET") {
  const url = "http://localhost:8080/user/backend/";
  fetch(url + resource, {
    method: method,
  })
    .then((res) => res.json())
    .then((data) => {
      callback(data);
      // handleFetchResponse(data);
    })
    .catch((err) => console.lo9g(err));
}
