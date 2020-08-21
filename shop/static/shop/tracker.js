$('#trackerForm').submit(function(event) {
    $('#items').empty();
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
        .done(function(data) {
            updates = JSON.parse(data);
            if (updates.length > 0 & updates != {}) {
                for (i = 0; i < updates.length; i++) {
                    let description = updates[i]['description'];
                    let time = updates[i]['time'];
                    mystr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    ${description}
                    <span class="badge badge-primary badge-pill">${time}</span>
                </li>`
                    $('#items').append(mystr);
                }
            } else {
            	mystr = `<li class="list-group-item d-flex justify-content-between align-items-center">
                    Sorry, We are not able to fetch this order id and email. Make sure to type correct order Id and email</li>`
            	$('#items').append(mystr);
            }
        });
    event.preventDefault();
});