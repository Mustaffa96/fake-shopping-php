<?php
require './include/db.php';
function getGuestUserCart()
{
    if (!isset($_SESSION['cart']))
        $_SESSION['cart'] = array();

    echo json_encode(['cart' => $_SESSION['cart']]);
}

// adds new product to the cart
function addToGuestUserCart()
{
    $id = $_POST['id'];
    $image = $_POST['image'];
    // $price = $_POST['price'];
    $stock = $_POST['stock'];
    $quantity = $_POST['quantity'];
    if (!isset($_SESSION['cart'][$id])) {
        $_SESSION['cart'][$id]['image'] = $image;
        $_SESSION['cart'][$id]['stock'] = $stock;
        $_SESSION['cart'][$id]['quantity'] = $quantity;
        // $_SESSION['cart'][$id]['price'] = ;
    } else {
        $_SESSION['cart'][$id]['quantity'] += $quantity;
    }
    $price = getProdPrice($id);
    $_SESSION['cart'][$id]['price'] = round(($price * $quantity));
    updateTotalCart();
    echo json_encode(['cart' => $_SESSION['cart']]);
}

// helper function - calculates price * quantity per product
function getProdPrice($id)
{
    global $conn;
    $stmt = "SELECT price FROM products WHERE id = '$id'";
    $prep_stmt = $conn->prepare($stmt);
    $prep_stmt->bind_param('i', $id);
    $prep_stmt->execute();
    if ($result = $prep_stmt->get_result())
        return $result->fetch_assoc()['price'];
    else
        return -1;
}

// helper function - calculates total price of all the products
function updateTotalCart()
{
    $total = 0.00;
    foreach ($_SESSION['cart'] as $item) {
        $total += $item['price'];
        $total = round($total, 2);
    }
    $_SESSION['cart']['total'] = $total;
}