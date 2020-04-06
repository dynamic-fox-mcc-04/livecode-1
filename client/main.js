let baseUrl = "http://localhost:3000"

$(document).ready(function () {
    auth()
    $("#logout").click(function () {
        localStorage.clear()
        auth()
    })
})

function auth() {
    if (localStorage.access_token) {
        $(".login_form").hide()
        $("#logout").show()
        $("#main").show()
        fetchData()
    } else {
        $(".login_form").show()
        $("#logout").hide()
        $("#main").hide()
    }
}


function login(event) {
    event.preventDefault()

    let email = $("#email").val()
    let password = $("#password").val()
    let data = {
        email,
        password
    }
    // console.log(data);
    $.ajax({
        method: 'POST',
        url: baseUrl + '/login',
        data: data
    }).done(datum => {
        // console.log(datum)
        localStorage.setItem('access_token', datum.access_token)
        auth()
    }).fail(err => {
        myAlert(err.responseJSON)
    })

}


function myAlert(msg) {
    $(".alert").find('.message').text(msg)
    $(".alert").fadeIn("slow", function () {
        setTimeout(function () {
            $(".alert").fadeOut("slow");
        }, 2000);
    })
}

function fetchData() {
    $.ajax({
        method: 'GET',
        url: baseUrl + '/foods',
        headers: {
            access_token: localStorage.access_token
        }
    }).done(data => {
        const { food } = data
        data.map({

        })

    }).fail(err => {
        console.log(err)
    })
}

function deleteFood(id) {
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/foods/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
}