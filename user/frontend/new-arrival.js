document.addEventListener("DOMContentLoaded", requestNewArrivals);
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