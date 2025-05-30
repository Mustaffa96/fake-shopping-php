<?php

// Cart Management API Handler
 
//  This file handles all cart-related operations for both logged-in and guest users.
//  Supported HTTP methods:
//  - GET: Retrieves the current cart contents
//  - POST: Adds a new product to the cart
//  - PATCH: Updates product quantities in the cart
//  - DELETE: Removes specific products from the cart
 
//  The implementation is split between logged users (stored in database) and 
//  guest users (stored in session), with respective logic in separate include files.

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

// update cart quantity
if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    parse_str(file_get_contents('php://input'), $_PATCH);

    if (isset($_SESSION['logged_user']))
        updateLoggedUserCart($_PATCH);
    else
        updateGuestUserCart($_PATCH);
    exit();
}

// delete specific product from the cart
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents('php://input'), $_DELETE);

    if (isset($_SESSION['logged_user']))
        deleteLoggedUserCartProduct($_DELETE);
    else
        deleteGuestUserCartProduct($_DELETE);
    exit();
}