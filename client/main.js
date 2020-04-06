const baseUrl = 'http://localhost:3000';

$(document).ready(() => {
    auth()
})

function auth() {
    if(localStorage.token){
        $('.login-page').hide()
        showDashboard()
    } else {
        $('.login-page').show()
        $('.dashboard-app').hide()
        $('#show-here').hide()
    }
}

function login(event) {
    event.preventDefault();
    const email = $('#input-email').val();
    const password = $('#input-password').val();
    console.log(email)
    console.log(password)
    $.ajax({
        method : 'POST',
        url : baseUrl + '/login',
        data : {
            email,
            password
        }
    })
        .done(result => {
            localStorage.setItem('token', result.access_token)
            auth()
        })
        .fail(err => {
            console.log(err.response.JSON)
        })
}

function createFood() {
    // event.preventDefault();
    const title = $('#name-food').val()
    const price = $('#price-food').val()
    const ingredients = $('#ingredients-food').val()
    const tag = $('#tag-food').val();
    
    $.ajax({
        method: 'POST',
        url: baseUrl + '/foods',
        data: {
            title,
            price,
            ingredients,
            tag
        },
        headers : {
            access_token : localStorage.getItem('token')
        }
    })
        .done(result => {
            auth()
            console.log(result)
        })
        .fail(err => {
            console.log(err)
        })
}

function showFoods() {
    $.ajax({
        method: 'GET',
        url: baseUrl + '/foods',
        headers : {
            access_token : localStorage.getItem('token')
        }
    })
        .done(result => {
            $('#show-here').empty()
            if(result.length < 1) {
                $('#show-here').append(`<h3>Your field is empty, lets create one</h3>`)
            } else {
                result.map(el => {
                    $('#show-here').append(`
                    <div class="card">
                      <div class="card-body pb-0">
                        <div class="d-flex justify-content-between mb-0">
                          <div class="col-9">
                            <h5 class="font-weight-bold">${el.title}</h5>
                            <p>Rp.${el.price}</p>
                          </div>
                          <div class="col-3 d-flex align-items-baseline">
                            <i class="fas fa-tag text-grey mr-2"></i>
                            <p class="text-grey">${el.tag}</p>
                            <button class="fas fa-trash text-danger ml-auto cursor-pointer" onclick="deleteFood(${el.id})"></button>
                          </div>
                        </div>
                        <div class="card-body border-bottom">
                          ${el.ingredients}
                        </div>
          ​            </div>
          ​          </div>
                    `)
                })
            }
        })
            .fail(err => {
                console.log(err)
            })
        }

function deleteFood(id) {
    $.ajax({
        method: 'DELETE',
        url: baseUrl + `/foods/${id}`,
        headers: {
            access_token : localStorage.getItem('token')
        }
    })
        .done(res => {
            auth()
        })
        .fail(err => {
            console.log(err)
        })
}

function showDashboard() {
    $('.login-page').hide()
    $('.dashboard-app').show()
    showFoods()
}

function logout() {
    localStorage.clear()
    auth()
}

$('#btn-create').on('click', () => {
    auth()
    $('#clear-page').show()
})
