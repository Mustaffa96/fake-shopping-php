<?php

require './include/logged_user_cart.php';
require '../../vendor/autoload.php';
\Stripe\Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://127.0.0.1:5500/user/frontend/';

$cart;
$logged_user_id;
$cart_id;
$total_price;
$name;
$stripe_data;


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_SESSION['logged_user'])) {
        $name = $_SESSION['logged_user']['name'];
        $logged_user_id = $_SESSION['logged_user']['id'];
        $cart_id = getCartId($logged_user_id);
        $cart = getAllCartItems($cart_id);
    } else {
        $cart = $_SESSION['cart'];
        $name = $_POST['name'];
    }
    $total_price = $cart['total'];
    unset($cart['total']);
    $stripe_data = initiateCheckout($total_price);
    addToOrderTable();
    clearCart();
    echo json_encode([
        'url' => $stripe_data['url'],
    ]);
    exit();
}

function initiateCheckout($price)
{
    $YOUR_DOMAIN = 'http://127.0.0.1:5500/user/frontend/';
    $checkout_session = \Stripe\Checkout\Session::create([
        'line_items' => [[
            // 'price'=> '{{PRICE_ID}}', // Replace with your actual price ID
            'price_data' => [
                'currency' => 'myr',
                'product_data' => [
                    'name' => 'Customer Shopping Bill',
                ],
                'unit_amount' => $price * 100, // Convert to cents
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => $YOUR_DOMAIN . 'success.html',
        'cancel_url' => $YOUR_DOMAIN . 'cancel.html',
    ]);
    return [
        'url' => $checkout_session->url,
        'payment_id' => $checkout_session->payment_intent
    ];
}

function addToOrderTable()
{
    global $cart;
    global $logged_user_id;
    global $conn;
    global $total_price;
    global $name;
    global $stripe_data;
    $address = $_POST['address'];
    $city = $_POST['city'];
    $postcode = $_POST['postcode'];

    $user_id = $logged_user_id == NULL ? 'NULL' : $logged_user_id;
    $payment_id = $stripe_data['payment_id'];
    error_log("Payment Intent ID: " . $payment_id);
    $stmt = "insert into fakeshop.order (user_id, name, address, city, post_code, total_price, payment_id, order_status) values($user_id, '$name', '$address', '$city', '$postcode', $total_price, '$payment_id', 'pending')";
    $conn->query($stmt);
    $order_id = $conn->insert_id;
    foreach ($cart as $id => $product) {
        // $product_id = $product['id'];
        $quantity = $product['quantity'];
        $prod_price = $product['price'];
        $stmt = "insert into order_item (order_id, product_id, quantity,price) values($order_id, $id, $quantity, $prod_price)";
        $conn->query($stmt);
    }
    return;
}

function clearCart()
{
    global $cart_id;
    global $conn;
    if (isset($_SESSION['cart']))
        unset($_SESSION['cart']);
    else {
        // First delete cart items
        $stmt = "delete from cart_item where cart_id = $cart_id;";
        $conn->query($stmt);
        // Then delete the cart
        $stmt = "delete from cart where id = $cart_id;";
        $conn->query($stmt);
    }
    return;
}
