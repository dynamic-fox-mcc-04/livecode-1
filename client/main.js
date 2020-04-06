let BASEURL = 'http://localhost:4000'
let token
let title
let price
let ingredients
let tag
let userId
let foodId

$(document).ready(function () {
    auth()
})

function auth() {
    token = localStorage.access_token
    if (token) {
        $('#pg-login').hide()
        $('#pg-main').show()
        fetchFoods()

    } else {

        $('#pg-login').show()
        $('#pg-main').hide()

    }
}


function login(event) {
    event.preventDefault()

    console.log("LOGIN FROM CLIENT");
    let email = $('#login-email').val()
    let password = $('#login-password').val()

    console.log([email, password]);

    $.ajax({
            method: 'post',
            url: BASEURL + '/login',
            data: {
                email,
                password
            }
        })
        .done(response => {
            console.log("LOGIN SUCCESS");
            localStorage.setItem('access_token', response.access_token)

            swal({
                title: "WELCOME BACK!",
                text: "Login Success",
                icon: "success",
                button: "CLOSE"
            })

            auth()
        })
        .fail(err => {
            console.log("ERROR LOGIN");
            let code = err.status
            let type = err.statusText
            let codetype = code + ' ' + type
            let msg = err.responseJSON.message

            swal({
                title: codetype,
                text: msg,
                icon: "error",
                button: "CLOSE"
            })

        })

}

function logout() {
    localStorage.clear()
    auth()
}

function fetchFoods() {
    console.log("FETCHING FOODS");
    $.ajax({
            method: "get",
            url: BASEURL + '/foods',
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
        .done(response => {
            console.log("FETCHING SUCCESS");

            $('#food-list').empty()
            response.forEach(el => {

                $('#food-list').append(`


                <div class="card">
                <div class="card-body pb-0">
                  <div class="d-flex justify-content-between mb-0">
                    <div class="col-9">
                      <h5 class="font-weight-bold">${el.title}</h5>
                      <p>${el.price}</p>
                    </div>
                    <div class="col-3 d-flex align-items-baseline">
                      <i class="fas fa-tag text-grey mr-2"></i>
                      <p class="text-grey">${el.tag}</p>
                      <button class="fas fa-trash text-danger ml-auto cursor-pointer"
                        onclick="dropFood(${el.id}, event)"></button>
                    </div>
                  </div>
                  <div class="card-body border-bottom">
                    ${el.ingredients}
                  </div>
        
                </div>
              </div>
                `)

            })
        })
        .fail(err => {
            console.log("ERROR LOGIN");
            let code = err.status
            let type = err.statusText
            let codetype = code + ' ' + type
            let msg = err.responseJSON.message

            swal({
                title: codetype,
                text: msg,
                icon: "error",
                button: "CLOSE"
            })

        })

}

function addFood(event) {

    event.preventDefault()

    console.log("ADDING FOOD TO LIST");
    title = $('#add-title').val()
    price = $('#add-price').val()
    ingredients = $('#add-ingredients').val()
    tag = $('#add-tag').val()

    $.ajax({
        method: 'post',
        url: BASEURL + '/foods',
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            title,
            price,
            ingredients,
            tag
        }
    })
    .done(response => {
        console.log("FOOD ADDED TO LIST");
        console.log(response);

        let newItem = `${response.title}`
        swal({
            title: "NEW FOOD ADDED",
            text: newItem,
            icon: "success",
            button: "CLOSE"
        })

        fetchFoods()


    })
    .fail(err => {
        console.log("ERROR ADD FOOD");
        let code = err.status
        let type = err.statusText
        let codetype = code + ' ' + type
        let msg = err.responseJSON.message

        swal({
            title: codetype,
            text: msg,
            icon: "error",
            button: "CLOSE"
        })

    })

}


function dropFood(foodid, event) {

    event.preventDefault()

    console.log("DROPPING FOOD FROM LIST");
    console.log(foodid);

    $.ajax({
        method: 'delete',
        url: BASEURL + '/foods/' + foodid,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log("FOOD DROPPED FROM LIST");
        console.log(response);

        swal({
            title: "FOOD DELETED",
            text: "You may close now",
            icon: "success",
            button: "CLOSE"
        })

        fetchFoods()


    })
    .fail(err => {
        console.log("ERROR ADD FOOD");
        let code = err.status
        let type = err.statusText
        let codetype = code + ' ' + type
        let msg = err.responseJSON.message

        swal({
            title: codetype,
            text: msg,
            icon: "error",
            button: "CLOSE"
        })

    })

}