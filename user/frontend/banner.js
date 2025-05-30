/**
 * Banner Carousel Management
 * 
 * This file handles the dynamic loading and display of banner images in a carousel/slider.
 * Features:
 * - Fetches banner data from banner.php
 * - Creates responsive banner slides with overlay and content
 * - Implements Swiper.js for smooth carousel functionality
 * - Includes autoplay, pagination, and navigation controls
 * - Supports text overlay with title, description, and CTA button
 */

document.addEventListener("DOMContentLoaded", requestBanners);

function requestBanners() {
  fetchCall("banner.php", ResponseBanners);
  function ResponseBanners(data) {
    if (data.banners) {
      const banners = data.banners;
      banners.forEach((banner) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        
        // Create overlay div for better text readability
        const overlay = document.createElement("div");
        overlay.className = "banner-overlay";
        
        // Create content container
        const content = document.createElement("div");
        content.className = "banner-content";
        
        slide.style.backgroundImage = `url('http://localhost:8080/${banner.image}')`;
        slide.style.height = "70vh"; // Increased height for better impact
        slide.style.backgroundSize = "cover";
        slide.style.backgroundPosition = "center";
        
        const h3 = document.createElement("h3");
        h3.className = "banner-title";
        h3.textContent = banner.name;
        
        const p = document.createElement("p");
        p.className = "banner-description";
        p.textContent = banner.description;
        
        const button = document.createElement("button");
        button.className = "banner-cta";
        button.textContent = "Shop Now";
        
        content.appendChild(h3);
        content.appendChild(p);
        content.appendChild(button);
        slide.appendChild(overlay);
        slide.appendChild(content);
        
        const swiperWrapper = document.querySelector(".swiper-wrapper");
        swiperWrapper.appendChild(slide);
      });
      callCarousal();
    }
  }
}

function callCarousal() {
  const swiper = new Swiper(".swiper", {
    loop: true,
    effect: "fade", // Add fade transition
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}