document.querySelector('#lite-shop-order').onsubmit = function(event){
    event.preventDefault();
    let username = document.querySelector('#username').value.trim();
    let phone = document.querySelector('#phone').value.trim();
    let email = document.querySelector('#email').value.trim();
    let address = document.querySelector('#address').value.trim();

    if(!document.querySelector('#rule').checked){
            Swal.fire({
                icon: 'info',
                title: 'Warning',
                text : 'Read and accept the rule',
                type : 'info',
                confirmButtonText : 'ok'
            });
            return false;
    }
    if (username == '' || phone == '' || email == '' || address == ''){
        Swal.fire({
            icon: 'info',
            title: 'Warning',
            text : 'Fill all fields',
            type : 'info',
            confirmButtonText : 'ok'
        });
        return false;
    }
    fetch('/finish-order',{
        method: 'POST',
        body: JSON.stringify({
            'username': username,
            'phone' : phone,
            'address' : address,
            'email' : email,
            'key' : JSON.parse(localStorage.getItem('cart'))
        }),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }
    })
    .then(function(response){
        return response.text();
    })
    .then(function(body){
        if(body == 1){
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text : 'Success',
                type : 'success',
                confirmButtonText : 'ok'
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Problem with mail',
                text : 'Error',
                type : 'error',
                confirmButtonText : 'ok'
            });
            return false; 
        }
    })
}