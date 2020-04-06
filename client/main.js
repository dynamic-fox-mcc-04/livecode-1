const baseUrl = "http://localhost:3000"

$(document).ready( () => {
    auth()

    $('#logout').click( () => {
        localStorage.clear()
        auth()
    })
})

function auth() {
    if (localStorage.token) {
        $('.loginPage').hide()
        $('.mainPage').show()
    } else {
        $('.loginPage').show()
        $('.mainPage').hide()
    }
    
}

function login(event) {
    event.preventDefault()

    $.ajax({
        method: "POST",
        url: baseUrl + '/users/login',
        data: {
            email: $('#email').val(),
            password: $('#password').val()
        }
    })
        .done(data => {
            localStorage.setItem('token', data.access_token)
            auth()
        })
        .fail( err=> { console.log(err, 'error')})
}