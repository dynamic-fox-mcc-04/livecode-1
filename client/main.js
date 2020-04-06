let baseUrl = 'http://localhost:3000'

$(document).ready(function(){
    authentication()
})

function authentication(){
    if(localStorage.access_token) {
        $('#loginPage').hide()
        $('#mainPage').show()
    }else {
        $('#loginPage').show()
        $('#mainPage').hide()

    }
}

function login(event) {
    event.preventDefault();

    let email= $('#exampleInputEmail1').val()
    let password= $('#exampleInputPassword').val()

    $.ajax({
        method:'post',
        url: baseUrl+ '/login',
        data: {
            email,
            password
        }
    })
        .done(data =>{
            localStorage.setItem('access_token',data.access_token)
            authentication()
        })
        .fail(err => {
            console.log(err.responseJSON.errors.map(el=> el.message))
        })
}
function logout() {
    localStorage.clear()
    authentication()
}

function createFood(event){
    event.preventDefault();
    let title= $('#titleAdd').val()
    let price= $('#priceAdd').val()
    let ingredients= $('#ingredientsAdd').val()
    let tag= $('#tagAdd').val()
    $.ajax({
        method:'post',
        url:baseUrl+'/foods',
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            price,
            ingredients,
            tag
        }
    })
    .done(()=> {
        authentication()
    })
    .fail(err => {
        console.log(err.responseJSON.errors.map(el=> el.message))
    })
}