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