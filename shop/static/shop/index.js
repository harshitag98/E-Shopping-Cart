var cart;

if(localStorage.getItem('cart')==null){
    cart = {};
}
else{
    cart = JSON.parse(localStorage.getItem('cart'))
    document.getElementById('cart_no').innerHTML = Object.keys(cart).length;
}

$('.cartButton').click(function(){
    var pr_id = this.id.toString();
    if(cart[pr_id] != undefined){
        cart[pr_id] = cart[pr_id] + 1;
    }
    else{
        cart[pr_id] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart_no').innerHTML = Object.keys(cart).length;
})

$('#popcart').popover();
document.getElementById("popcart").setAttribute('data-content', '<h5>Items in your shopping cart</h5>');