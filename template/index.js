
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
        console.log($('#exampleInputEmail1').val())
        console.log($('#exampleInputPassword').val())
        $.ajax({
            url: 'http://localhost:3000/login',
            method: 'POST',
            data: {
                email: $('#exampleInputEmail1').val(),
                password: $('#exampleInputPassword').val()
            }
        })
            .done(function(result) {
                console.log(result)
                localStorage.setItem('access_token', result.access_token)
                GenerateFood()
            
            })
            .catch(function(err) {
                console.log('ERROR LOGIN')
            })
    })

    $("#CreateFood").on('submit', function(e) {
        e.preventDefault()
        // console.log($('#CreateTitle').val())
        // console.log($('#CreatePrice').val())
        // console.log($('#CreateIngredient').val())
        // console.log($('#CreateTag').val())
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
                GenerateFood()
            })
            .fail(function(err) {
                console.log(`Failed to Add Food ${err}`)
            })
    })
})