var cart;

if (localStorage.getItem('cart') == null) {
    cart = {};
} else {
    cart = JSON.parse(localStorage.getItem('cart'));
}

var sum = 0;
if ($.isEmptyObject(cart)) {
    mystr = `<p>Your cart is empty, please add some items to your cart before placing order!</p>`;
    $('#items').append(mystr);
} else {
    for (item in cart) {
        let name = cart[item][0];
        let qty = cart[item][1];
        sum = sum + qty;
        mystr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${name}
                    <span class="badge badge-primary badge-pill">${qty}</span>
                </li>`
        $('#items').append(mystr);
    }
}
document.getElementById('cart_no').innerHTML = sum;

$('#itemsJson').val(JSON.stringify(cart));

if(thank == 1){
    var str = "Thanks for ordering with us. Your order id is " + id + ". Use it to track your order using our order tracker";
    alert(str);
    localStorage.clear();
    document.location = "/shop";
}