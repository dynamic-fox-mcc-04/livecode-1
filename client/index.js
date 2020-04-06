function fetchFood() {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/foods',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done((food) => {
      $('#food-list').empty()
      for (let i = 0; i < food.length; i++) {
        $('#food-list').append(`
        <div class="card" id="${food[i].id}">
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between mb-0">
              <div class="col-9">
                <h5 class="font-weight-bold">${food[i].title} </h5>
                <p>${food[i].price}</p>
              </div>
              <div class="col-3 d-flex align-items-baseline">
                <i class="fas fa-tag text-grey mr-2"></i>
                <p class="text-grey">${food[i].tag}</p>
                <button onclick="deleteFood(${food[i].id})" class="fas fa-trash text-danger ml-auto cursor-pointer"></button>
              </div>
            </div>
            <div class="card-body border-bottom">
            ${food[i].ingredients}
            </div>

          </div>
        </div>
        `)
      }
    })
    .fail(err => {
      console.log(err)
    })
}

function deleteFood(id) {
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/foods/${id}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(_ => {
      $(`#${id}`).remove()
      $('#login-page').hide()
      $('#dashboard-page').show()
    })
    .fail(err => {
      console.log(err)
    })
}

$(document).ready(function () {
  let token = localStorage.getItem('token')
  if (token) {
    $('#login-page').hide()
    $('#dashboard-page').show()
    fetchFood()
  }
  else {
    $('#login-page').show()
    $('#dashboard-page').hide()

  }

  $('#login-form').on('submit', function (event) {
    event.preventDefault()
    let email = $('#login-email').val()
    let password = $('#login-password').val()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/login',
      data: {
        email, password
      }
    })
      .done((data) => {
        let token = data.access_token
        localStorage.setItem('token', token)
        $('#login-page').hide()
        $('#dashboard-page').show()
        fetchFood()
      })
      .fail(err => {
        console.log(err)
      })
  })

  $('#create-form').on('submit', function (event) {
    event.preventDefault()
    let title = $('#title').val()
    let price = $('#price').val()
    let ingredients = $('#ingredients').val()
    let tag = $('#tag').val()
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/foods',
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        title, price, ingredients, tag
      }
    })
      .done((newFood) => {
        $('#login-page').hide()
        $('#dashboard-page').show()
        fetchFood()
      })
      .fail(err => {
        console.log(err)
      })
  })

  $('#logout-btn').on('click', function () {
    localStorage.clear()
    $('#login-page').show()
    $('#dashboard-page').hide()
  })
})