

$(document).ready(function () {
  let token = localStorage.getItem('token')
  if (token) {
    $('#login-page').hide()
    $('#dashboard-page').show()

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