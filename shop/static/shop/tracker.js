$('#trackerForm').submit(function (event) {
    $('#status').empty();
    $('#orderItems').empty();
    document.getElementById('track').style.display = 'none';
    var formData = {
        'order_id': $('input[name=order_id]').val(),
        'email': $('input[name=email]').val(),
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
    };
    $.ajax({
            type: 'POST',
            url: '/shop/tracker/',
            data: formData,
            encode: true
        })
        .done(function (data) {
            var data = JSON.parse(data);
            if (data.length === 0) {
                var p = document.getElementById('track');
                p.innerHTML = '<h4>Sorry, We are not able to fetch this order id and email. Make sure to type correct order Id and email</h4>';
                p.style.display = 'block';
                document.getElementById('div2').style.display = 'none';
                document.getElementById('div1').style.display = 'none';
            } else {
                var updates = data[0];
                if (updates.length > 0 & updates != {}) {
                    for (var i = 0; i < updates.length; i++) {
                        let description = updates[i]['description'];
                        let time = updates[i]['time'];
                        var mystr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                        ${description}
                        <b><span>${time}</span></b>
                    </li>`
                        $('#status').append(mystr);
                    }
                    document.getElementById('div1').style.display = 'block';
                    document.getElementById('div2').style.display = 'block';

                }
                var cart = JSON.parse(data[1]);
                for (var item in cart) {
                    let name = item;
                    let qty = cart[item];
                    var mystr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                                ${name}
                                <b><span>${qty}</span></b>
                            </li>`
                    $('#orderItems').append(mystr);
                }
            }
        });
    event.preventDefault();
});