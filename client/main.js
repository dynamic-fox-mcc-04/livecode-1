$(document).ready(function() {
    auth()
})

function auth() {
    if (localStorage.getItem('token')) {
        $('#authpage').hide()
        $('#mainpage').show()
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

function getFoods() {
    console.log('masuk get music')

    $.ajax({
            method: 'get',
            url: `http://localhost:3000/foods`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(result => {
            let foods = result.Foods
            console.log(`inifoods`, result)
            console.log(foods)
            $('#mid-main-con').html('')
            foods.forEach(food => {
                $('#mid-main-con').append(`
                <div class="card text-white bg-success mb-1" style="max-width: 50rem;">
                    <div class="card-header">${food.title}</div>
                    <div class="card-body">
                        <p class="card-title">${food.artist}</p>
                        <p class="card-title">${food.genre}</p>
                    </div>
                    <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-primary" onclick="deleteMusic(event, '${music.id}')">delete</button>
                        <button type="button" class="btn btn-primary">update</button>
                    </div>
                </div>`)
            });
        })
        .fail(err => {
            console.log(err)
        })
}