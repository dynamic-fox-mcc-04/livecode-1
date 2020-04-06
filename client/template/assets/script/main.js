let baseURL = 'http://localhost:3000/'

$( document ).ready(function() {
    console.log( "ready!" );
    auth()
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
            auth()
            // console.log(data)
        })
        .fail((err)=>{
            console.log(err)
        })
}

function create_food(event) {
    event.preventDefault()
    const title = $('#food-name').val()
    const price = $('#food-price').val()
    const ingredients = $('#food-ingredients').val()
    const tag = $('#food-tag').val()
    console.log(title)
    $.ajax({
        method: 'POST',
        url: baseURL + 'foods',
        data:{
            title,
            price,
            ingredients,
            tag
        },
        headers:{
            access_token : localStorage.access_token
        },
    })
    .done((data)=>{
        console.log(data)
        auth()
    })
    .fail((err)=>{
        console.log(err)
    })
}

function fetchData(event) {
    event.preventDefault()
    $('#content').empty()
    $.ajax({
        method: 'GET',
        url: baseURL + 'foods',
        headers:{
            access_token : localStorage.access_token
        },
    })
    .done((data)=>{
        for(let i in data){
            const id = data[i].id
            const title = data[i].title
            const price = data[i].price
            const ingredients = data[i].ingredients
            const tag = data[i].tag
            $('#content').append(
                `
                <div class="card">
                    <div class="card-body pb-0">
                        <div class="d-flex justify-content-between mb-0">
                        <div class="col-9">
                            <h5 class="font-weight-bold">${title}</h5>
                            <p>Rp.${price}</p>
                        </div>
                        <div class="col-3 d-flex align-items-baseline">
                            <i class="fas fa-tag text-grey mr-2"></i>
                            <p class="text-grey">${tag}</p>
                            <button onclick="hapus(${id})" class="fas fa-trash text-danger ml-auto cursor-pointer"></button>
                        </div>
                        </div>
                        <div class="card-body border-bottom">
                        ${ingredients}
                        </div>

                    </div>
                </div>`
            )
        }
    })
    .fail((err)=>{
        console.log('ini error',err)
    })
}

function auth(params) {
    if(localStorage.access_token){
        $('#login-form').hide()
        $('#data-content').show()
        fetchData(event)
    }else{
        $('#login-form').show()
        $('#data-content').hide()
    }
}

function hapus(id) {
    $.ajax({
        method: 'DELETE',
        url: baseURL + 'foods/'+ id,
        headers:{
            access_token : localStorage.access_token
        },
    })
    .done((data)=>{
        console.log(data)
        auth()
    })
    .fail((err)=>{
        console.log(err)
    })
}