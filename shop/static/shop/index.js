var cart;

if (localStorage.getItem('cart') == null) {
    cart = {};
}
else {
    cart = JSON.parse(localStorage.getItem('cart'))
    document.getElementById('cart_no').innerHTML = Object.keys(cart).length;
}

document.getElementById("popcart").addEventListener('click', function(){
    $('#popcart').popover();
    updatePopover();
    $('#popcart').popover('show');
})
function updatePopover() {
    var cart_str = "<h5> Items in your shopping cart </h5><div class='mx-2 my-2'>";
    var i = 1;
    for (var item in cart) {
        cart_str = cart_str + "<b>" + i + "</b>. ";
        cart_str = cart_str + document.getElementById('name' + item).innerHTML + "<b>   Qty: </b>" + cart[item] + '<br>';
        i = i + 1;
    }
    cart_str = cart_str + "</div>"
    document.getElementById('popcart').setAttribute('data-content', cart_str);
}

$('.spanpr').on("click", "button.cartButton", function () {
    var pr_id = this.id;
    if (cart[pr_id] != undefined) {
        cart[pr_id] = cart[pr_id] + 1;
    }
    else {
        cart[pr_id] = 1;
    }
    updateCart(cart, pr_id);
});

function displayCartValue() {
    var sum = 0;
    for (var item in cart) {
        sum = sum + cart[item];
    }
    document.getElementById('cart_no').innerHTML = sum;
}

function updateCart(cart, pr_id) {
    document.getElementById('span' + pr_id).innerHTML = "<button id='minus" + pr_id + "' class='btn btn-primary minus mr-2'>-</button> <span id='val" + pr_id + "'>" + cart[pr_id] + "</span> <button id='plus" + pr_id + "' class='btn btn-primary plus mx-2'>+</button>";
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartValue();
    updatePopover();
}

$('.spanpr').on("click", "button.minus", function () {
    var m_id = this.id.slice(5,);
    cart[m_id] = cart[m_id] - 1;
    if (cart[m_id] == 0) {
        document.getElementById('span' + m_id).innerHTML = "<button id='" + m_id + "' class='btn btn-primary cartButton mr-2'>Add to Cart</button>"
        delete cart[m_id];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartValue();
        updatePopover();
    }
    else {
        document.getElementById('val' + m_id).innerHTML = cart[m_id];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartValue();
        updatePopover();
    }
});

$('.spanpr').on("click", "button.plus", function () {
    var m_id = this.id.slice(4,);
    cart[m_id] = cart[m_id] + 1;
    document.getElementById('val' + m_id).innerHTML = cart[m_id];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartValue();
    updatePopover();
});