<?php
require './include/db.php';

function getLoggedUserCart()
{
    global $conn;
    $cart = array();
    $user_id = getUserId();
    // step 1: get the id from the cart table where user_id=logged user id
    $cart_id = getCartId($user_id);
    if ($cart_id)
        $cart = getAllCartItems($cart_id);
    echo json_encode(['cart' => $cart]);
}

// add new product to the cart
function addToLoggedUserCart()
{
    global $conn;
    $prod_id = $_POST['id'];
    $quantity = $_POST['quantity'];
    $card_id = getCartId(getUserId());
    $stmt = "INSERT INTO cart_item (cart_id, prod_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?;";
    $prep_stmt = $conn->prepare($stmt);
    $prep_stmt->bind_param("iiii", $card_id, $prod_id, $quantity, $quantity);
    $prep_stmt->execute();
    $prep_stmt->close();
    $cart = getAllCartItems($card_id);
    echo json_encode(['cart' => $cart]);
}

// update product in the cart
function updateLoggedUserCart()
{
    global $conn;
    // Parse PATCH data
    parse_str(file_get_contents("php://input"), $_PATCH);
    $prod_id = $_PATCH['id'];
    $quantity = $_PATCH['quantity'];
    $cart_id = getCartId(getUserId());
    $stmt = "UPDATE cart_item SET quantity = ? WHERE cart_id =$cart_id AND prod_id = ?;";
    $prep_stmt = $conn->prepare($stmt);
    $prep_stmt->bind_param("ii", $quantity, $prod_id);
    $prep_stmt->execute();
    $prep_stmt->close();
    $cart = getAllCartItems($cart_id);
    echo json_encode(['cart' => $cart]);
}

// delete product from the cart
function deleteLoggedUserCartProduct($_DELETE) {
    global $conn;
    $prod_id = $_DELETE['id'];
    $cart_id = getCartId(getUserId());
    $stmt = "DELETE FROM cart_item WHERE cart_id = $cart_id AND prod_id = ?;";
    $prep_stmt = $conn->prepare($stmt);
    $prep_stmt->bind_param("i", $prod_id);
    $prep_stmt->execute();
    $prep_stmt->close();
    $cart = getAllCartItems($cart_id);
    echo json_encode(['cart' => $cart]);
}


// helper function - get user id
function getUserId()
{
    return $_SESSION['logged_user']['id'];
}

// helper function - get cart id
function getCartId($user_id)
{
    global $conn;
    $cart_id = null;
    $stmt = "SELECT id FROM cart WHERE user_id = $user_id;";
    if ($result = $conn->query($stmt)) {
        if ($result->num_rows) {
            $cart_id = $result->fetch_assoc()['id'];
        } else {
            $stmt = "INSERT INTO cart (user_id) VALUES ($user_id);";
            if ($conn->query($stmt)) {
                if ($conn->affected_rows) {
                    $cart_id = $conn->insert_id;
                }
            }
        }
    }
    return $cart_id;
}

// helper function - get all cart items
function getAllCartItems($cart_id)
{
    global $conn;
    $cart_items = array();
    $stmt = $conn->prepare('SELECT p.id, p.image, ci.quantity, truncate((p.price * ci.quantity), 2)  as price, i.stock FROM product p inner join cart_item ci on p.id=ci.prod_id AND ci.cart_id = ? inner join inventory i on p.id=i.product_id;');
    $stmt->bind_param("i", $cart_id);
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows) {
            while ($row = $result->fetch_assoc()) {
                $id = $row['id'];
                $prod_array[$id]['image'] = $row['image'];
                $prod_array[$id]['stock'] = $row['stock'];
                $prod_array[$id]['quantity'] = $row['quantity'];
                $prod_array[$id]['price'] = $row['price'];
            }
        }
        $result->close();
    }
    $stmt->close();
    return updateTotalLoggedCart($prod_array);
}

// helper function - update total price in the cart
function updateTotalLoggedCart($prod_array)
{
    $total = 0.0;
    foreach ($prod_array as $item) {
        $total += $item['price'];
        $total = round($total, 2);
    }
    $prod_array['total'] = $total;
    return  $prod_array;
}
