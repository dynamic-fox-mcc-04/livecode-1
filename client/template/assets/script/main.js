let baseURL = 'http://localhost:3000/'

$( document ).ready(function() {
    console.log( "ready!" );
})

function logout(event) {
    event.preventDefault()
    localStorage.clear()
    auth()
}

function login(event) {
    event.preventDefault()
    const email = $('#email-login').val()
    const password = $('#password-login').val()
    $.ajax({
        method: 'POST',
        url: baseURL + 'login',
        data:{
            email,
            password
        }
    })
        .done((data)=>{
            localStorage.setItem('access_token', data.access_token)
            $('#login-form').hide()
            $('#data-content').show()
            console.log(data)
        })
        .fail((err)=>{
            console.log(err)
        })
}

function fetchData(params) {
    
}

function auth(params) {
    if(localStorage.access_token){
        $('#login-form').hide()
        $('#data-content').show()
    }else{
        $('#login-form').show()
        $('#data-content').hide()
    }
}