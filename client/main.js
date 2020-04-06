function showLandingPage() {
    $('#landing-page').show()
    $('#dashboard').hide()
}
function showDashboard() {
    $('#landing-page').hide()
    getRecipe(event)
    $('#dashboard').show()
}

function login(event) {
    event.preventDefault()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email: $('#email-login').val(),
            password: $('password-login').val()
        }
    }).done(response => {
        localStorage.setItem('token', response.access_token)
        showDashboard()
    }).fail(err => {
        $('#fail').empty()
        $('#fail').append(err.responseJSON)
        $('#fail').show(1000)
        $('#fail').hide(1000)
        console.log(err)
    })
}

function addRecipe(event) {
    event.preventDefault()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/foods',
        headers: {
            access_token: localStorage.getItem('token')
        },
        data: {
            title: $('#add-title').val(),
            price: $('#add-price').val(),
            description: $('#add-description').val(),
            tag: $('#add-tag').val()
        }
    }).done(response => {
        getRecipe(event)
    })
}
function getRecipe(event) {
    event.preventDefault()
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/foods',
        headers: {
            access_token: localStorage.getItem('token')
        }
    }).done(response => {
        $('#list-food').empty()
        response.forEach(el => {
            $('#list-food').append(`
            <div class="card">
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between mb-0">
              <div class="col-9">
                <h5 class="font-weight-bold">${el.title} </h5>
                <p>${el.price}</p>
              </div>
              <div class="col-3 d-flex align-items-baseline">
                <i class="fas fa-tag text-grey mr-2"></i>
                <p class="text-grey">${el.tag}</p>
                <button onclick="deleteRecipe(${el.id})" class="fas fa-trash text-danger ml-auto cursor-pointer"></button>
              </div>
            </div>
            <div class="card-body border-bottom">
              ${el.description}
            </div>`)
        })

    }).fail(err => {
        $('#fail').empty()
        $('#fail').append(err.responseJSON)
        $('#fail').show(1000)
        $('#fail').hide(1000)
        console.log(err)
    })
}

function deleteRecipe(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/foods/${id}`,
        headers: {
            access_token: localStorage.getItem('token')
        }
    }).done(response => {
        console.log(response)
        getRecipe(event)
    }).fail(err => {
        $('#fail').empty()
        $('#fail').append(err.responseJSON)
        $('#fail').show(1000)
        $('#fail').hide(1000)
        console.log(err)
    })
}

function logout(event) {
    event.preventDefault()
    localStorage.clear()
    showLandingPage()
}

$('document').ready(function() {
    let token = localStorage.getItem('token')
    $('#fail').hide()
    console.log('jquery on!')
    if(!token) {
        showLandingPage()
    } else {
        showDashboard()
    }
})