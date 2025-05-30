/**
 * New Arrivals Module
 * This module handles fetching and displaying new arrival products on the page.
 * It makes an AJAX call to newArrivals.php to get the latest products and 
 * populates them in the designated new arrivals section.
 */

document.addEventListener("DOMContentLoaded", requestNewArrivals);

/**
 * Initiates the request to fetch new arrival products
 * Uses fetchCall utility to make AJAX request to newArrivals.php
 * and handles the response through ResponseNewArrivals callback
 */
function requestNewArrivals() {
  fetchCall("newArrivals.php", ResponseNewArrivals);
  
  /**
   * Callback function that processes the new arrivals data
   * @param {Object} data - Response data containing newArrivals array
   */
  function ResponseNewArrivals(data) {
    if (data.newArrivals) {
      const newArrivals = data.newArrivals;
      const newArrivalSection = document.querySelector(".new-arrivals");
      populateCatalogue(newArrivals, newArrivalSection);
    }
  }
}