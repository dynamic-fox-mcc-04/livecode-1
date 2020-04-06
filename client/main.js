$(document).ready(function() {
    auth()
})

function auth() {
    if (localStorage.getItem('token')) {
        $('#authpage').hide()
        $('#mainpage').show()
        getFoods()
    } else {
        $('#authpage').show()
        $('#mainpage').hide()
    }
}

function signOut() {
    localStorage.clear()
    auth()
}

$('#signin-btn').click(e => {
    e.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    $.ajax({
            method: 'post',
            url: `http://localhost:3000/users/register`,
            data: {
                email,
                password
            },
            success: function(data1) {
                $.ajax({
                        method: 'post',
                        url: `http://localhost:3000/users/login`,
                        data: data1
                    })
                    .done(result => {
                        localStorage.setItem('token', result.token)
                        console.log(`done login`, result)
                        auth()
                    })
                    .fail(err => {
                        console.log(err)
                    })
            }
        })
        .done(result => {
            console.log(`result regist`, result)
        })
        .fail(err => {
            console.log(err)
        })
})

$('#addForm').submit(e => {
    e.preventDefault()
    $.ajax({
            method: 'post',
            url: `http://localhost:3000/foods`,
            data: {
                title: $('#title').val(),
                price: $('#price').val(),
                ingredients: $('#ingredients').val(),
                tag: $('#tag').val()
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(result => {
            console.log(`ini result create`)
            console.log(result)
            getFoods()
        })
        .fail(err => {
            console.log(err)
        })
})

function getFoods() {
    console.log('masuk get food')

    $.ajax({
            method: 'get',
            url: `http://localhost:3000/foods`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(result => {
            console.log(result)
            let foods = result.Foods
            console.log(`inifoods`, result.Foods)
            console.log(foods)
            $('#food').html('')
            foods.forEach(food => {
                $('#food').append(`
                    <div class="card">
                    <div class="card-body pb-0">
                        <div class="d-flex justify-content-between mb-0">
                            <div class="col-9">
                                <h5 class="font-weight-bold">${food.title}</h5>
                                <p>${food.price}</p>
                            </div>
                            <div class="col-3 d-flex align-items-baseline">
                                <i class="fas fa-tag text-grey mr-2"></i>
                                <p class="text-grey">${food.tag}</p>
                                <button class="fas fa-trash text-danger ml-auto cursor-pointer" onclick="deleteFood('${food.id}')"></button>
                            </div>
                        </div>
                        <div class="card-body border-bottom">
                        ${food.ingredients}
                        </div>

                    </div>
                </div>`)
            });
        })
        .fail(err => {
            console.log(err)
        })
}

$('#addForm').submit(e => {
    e.preventDefault()
    $.ajax({
            method: 'post',
            url: `http://localhost:3000/foods`,
            data: {
                title: $('#title').val(),
                price: $('#price').val(),
                ingredients: $('#ingredients').val(),
                tag: $('#tag').val()
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(result => {
            console.log(result)
            getFoods()
        })
        .fail(err => {
            console.log(err)
        })
})

function deleteFood(id) {
    // e.preventDefault()
    $.ajax({
            method: 'delete',
            url: `http://localhost:3000/foods/${id}`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(result => {
            console.log(result)
            getFoods()
        })
        .fail(err => {
            console.log(err)
        })
}