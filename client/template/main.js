const localhost = 'http://localhost:3000'

$(document).ready(() => {
    auth()
    $('#logout').click(function() {
        localStorage.clear()
        auth()
    })
})

function auth() {
    if (localStorage.token) {
        $('#loginpage').hide()
        $('#homepage').show()
        $('#addfood').hide()
        $('#foodlist').show()
    } else {
        $('#loginpage').show()
        $('#homepage').hide()
        $('#addfood').hide()
        $('#foodlist').hide()
    }
}

function login(event) {
    event.preventDefault()
    let email = $('#exampleInputEmail').val()
    let password = $('#exampleInputPassword').val()

    $.ajax({
            method: 'POST',
            url: localhost + '/users/login',
            data: { email, password }
        })
        .done(data => {
            localStorage.setItem('token', data.token)
            auth()
        })
        .fail()
}

function fetchFoods() {
    $.ajax({
            method: 'GET',
            url: localhost + '/foods',
            headers: {
                token: localStorage.token
            }
        })
        .done(result => {
            $('#listfood').empty()
            for (let i = 0; i < result.data.length; i++) {
                let title = result.data[i].title
                let price = result.data[i].price
                let ingredients = result.data[i].ingredients
                let tag = result.data[i].tag

                $('#listfood').append(`
                <div class="card">
                <div class="card-body pb-0">
                    <div class="d-flex justify-content-between mb-0">
                        <div class="col-9">
                            <h5 class="font-weight-bold">${title}</h5>
                            <p>${price}</p>
                        </div>
                        <div class="col-3 d-flex align-items-baseline">
                            <i class="fas fa-tag text-grey mr-2"></i>
                            <p class="text-grey">${tag}</p>
                            <button class="fas fa-trash text-danger ml-auto cursor-pointer"></button>
                        </div>
                    </div>
                    <div class="card-body border-bottom">
                        ${ingredients}
                    </div>

                </div>
            </div>
                `)
            }
        })
        .fail(err => {
            console.log(err, 'error')
        })
}

function addBook(event) {
    event.preventDefault()
    let title = $('#title').val()
    let price = $('#price').val()
    let ingredients = $('#ingredients').val()
    let tag = $('#tag').val()

    $.ajax({
            method: 'POST',
            url: localhost + '/foods',
            headers: {
                token: localStorage.token
            },
            data: {
                title,
                price,
                ingredients,
                tag
            }
        })
        .done(result => {
            auth()
            $('#addfood').hide()
        })

}