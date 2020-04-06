
$(document).ready(function() {
    if(localStorage.getItem('access_token')) {
        SignedIn()
        GenerateFood()
    }
    else {
        NotSignedIn()
    }

    $('#Login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: 'http://localhost:3000/login',
            method: 'POST',
            data: {
                email: $('#exampleInputEmail1').val(),
                password: $('#exampleInputPassword').val()
            }
        })
            .done(function(result) {
                $('#exampleInputEmail1').val('')
                $('#exampleInputPassword').val('')
                localStorage.setItem('access_token', result.access_token)
                GenerateFood()
                SignedIn()
            
            })
            .catch(function(err) {
                $('#exampleInputEmail1').val('')
                $('#exampleInputPassword').val('')
                console.log(err.responseJSON.message)
            })
    })

    $("#CreateFood").on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: 'http://localhost:3000/foods',
            method: 'POST',
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: {
                title: $('#CreateTitle').val(),
                price: $('#CreatePrice').val(),
                ingredients: $('#CreateIngredient').val(),
                tag: $('#CreateTag').val()
            }
        })
            .done(function(result) {
                $('#CreateTitle').val('')
                $('#CreatePrice').val('')
                $('#CreateIngredient').val('')
                $('#CreateTag').val('')
                GenerateFood()
            })
            .fail(function(err) {
                $('#CreateTitle').val('')
                $('#CreatePrice').val('')
                $('#CreateIngredient').val('')
                $('#CreateTag').val('')
                console.log(err.responseJSON.message)
            })
    })
    $('#Logout').on('click', function(e) {
        e.preventDefault()
        Logout()
    })
})