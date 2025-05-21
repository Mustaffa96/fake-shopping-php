<?php

require './include/logged_user_cart.php';
require './include/guest_user_cart.php';

// returns the cart to the user
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['logged_user']))
        getLoggedUserCart();
    else
        getGuestUserCart();
    exit();
}

// Add new product to the cart
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['logged_user']))
        addToLoggedUserCart();
    else
        addToGuestUserCart();
    exit();
}