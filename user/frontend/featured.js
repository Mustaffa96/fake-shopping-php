/**
 * Featured Products Module
 * 
 * This module handles the fetching and display of featured products on the page.
 * It uses an event listener to load featured products when the DOM is ready,
 * makes an AJAX call to featured.php, and populates the featured products section
 * with the received data using the populateCatalogue helper function.
 */

document.addEventListener("DOMContentLoaded", requestFeatured);

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