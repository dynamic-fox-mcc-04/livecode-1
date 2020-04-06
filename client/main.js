//..main.js connect dulu, jquery kemudian, ()) document ready, onclick signout, fucntion signin, baru function auth
let baseURL = "http://localhost:3000"

$( document ).ready(function() {
    // Handler for .ready() called.
    auth()
    $( '#logout' ).click(function( event ) {
        // Storagetoken akan dihapus di sini, kemudian kembalikan process ke auth()
        localStorage.clear()
        auth()
    })
});

function auth(){
    //penampilan kondisional
    if(localStorage.token){
        //signingakada, yang ada hanya main page
        $('#login-page').hide()
        $('#full-app-page').show()
    } else {
        $('#login-page').show()
        $('#full-app-page').hide()
    }
}

function login(event){
        event.preventDefault()
        let email = $("#exampleInputEmail1").val();
        let password = $('#exampleInputPassword').val();
        $.ajax({
            method: "POST",
            url: baseURL + "/login",
            data: {
                email, password
            }
            .done(data => {
                console.log(data)
            })
            .fail(error => {
                res.status(500).json({
                    error
                })
            })

        })
}

function addFood( event ){
    // form-control my-2
    // form-control my-2
    // form-control
}