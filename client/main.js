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
        foodList()
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

function createFood(event){
    event.preventDefault()

    let data = {
        title: $('#title').val(),
        price: $('#price').val(),
        ingredients: $('#ingredients').val(),
        tag: $('#tag').val(),

    }
    $.ajax({
        method: 'POST',
        url: baseUrl + '/foods',
        headers: {
            access_token: localStorage.token
        },
        data
    })
        .done(result => {
            auth()
        })
        .fail( err=> { console.log(err, 'error')})
}

function foodList() {
    $('foodList').empty()
    $.ajax({
        method: 'GET',
        url: baseUrl + '/foods',
        headers: {
            access_token: localStorage.token
        }
    })
        .done( data => {
            for (let i = 0; i < data.result.length; i++) {
                $('.foodList').append(`
                    <tr>
                        <td>${data.result[i].title}</td>
                        <td>${data.result[i].price}</td>
                        <td>${data.result[i].ingredients}</td>
                        <td>${data.result[i].tag}</td>
                        <td>
                            <button onclick = "deleteBtn${data.result[i].tag}"></button>
                        </td>

                    </tr>
                `)
            }
        })
        .fail( err=> { console.log(err, 'error')})

}