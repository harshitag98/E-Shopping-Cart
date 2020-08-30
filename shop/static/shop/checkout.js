var cart;

if (localStorage.getItem('cart') == null) {
    cart = {};
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}

var sum = 0;
var totalPrice = 0;
if ($.isEmptyObject(cart)) {
    mystr = `<p>Your cart is empty, please add some items to your cart before placing order!</p>`;
    $('#items').append(mystr);
} else {
    for (item in cart) {
        let name = cart[item][0];
        let qty = cart[item][1];
        let itemPrice = cart[item][2];
        sum = sum + qty;
        totalPrice = totalPrice + (qty * itemPrice);
        mystr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${name}
                    <b><span> ${qty} * ${itemPrice}</span></b>
                </li>`
        $('#items').append(mystr);
    }
}
document.getElementById('cart_no').innerHTML = sum;
document.getElementById('totalPrice').innerHTML = totalPrice;

$('#amount').val($('#totalPrice').html())

var order_products = {};
for (item in cart) {
    order_products[cart[item][0]] = cart[item][1];
}
$('#itemsJson').val(JSON.stringify(order_products));