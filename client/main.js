const baseUrl = 'http://localhost:3000'

$(document).ready(function() {
    auth()
    $('#logout').click(function () {
        localStorage.clear()
        auth()
    })
})


function create(event){

    event.preventDefault()

    let title = $('#title').val()
    let price = $('#price').val()
    let ingredients = $('#ingredients').val()
    let tag = $('#tag').val()

    $.ajax({
        method : 'POST',
        url : baseUrl + '/foods',
        data : {
            title,
            price,
            ingredients,
            tag
        },
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done(result => {
        getFood()
    })
    .fail(err => {
        console.log(err);
        
    })

}


function getFood(){
    
    $.ajax({
        method :'GET',
        url : baseUrl + '/foods',
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done(result => {

        $('.listFood').empty()
        
        result.forEach(el => {
            
            $('.listFood').append(`
            
            <div class="col-md-10">
            <div class="card">
              <div class="card-body pb-0">
                <div class="d-flex justify-content-between mb-0">
                  <div class="col-9">
                    <h5 class="font-weight-bold">${el.title} </h5>
                    <p>Rp.${el.price}</p>
                  </div>
                  <div class="col-3 d-flex align-items-baseline">
                    <i class="fas fa-tag text-grey mr-2"></i>
                    <p class="text-grey">${el.tag}</p>
                    <button class="fas fa-trash text-danger ml-auto cursor-pointer" onclick=deleteFood(${el.id})></button>
                  </div>
                </div>
                <div class="card-body border-bottom">
                ${el.ingredients}
                </div>
              </div>
            </div>
          </div>
            `)
        });
    })
    .fail(err => {
        console.log(err);
    })
    

}

function deleteFood(id) {
    
    $.ajax({
        method :'DELETE',
        url : baseUrl + '/foods/' + id,
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done(result => {
        getFood()
    })
    .fail(err => {
        console.log(err);
        
    })
}


function login(event){
    event.preventDefault()

    let email = $('#emailLogin').val()
    let password = $('#passwordLogin').val()

    $.ajax({
        method :'POST',
        url : baseUrl + '/login',
        data : {
            email,
            password
        }
    })
    .done(result => {

        localStorage.setItem('access_token', result.access_token)

    })
    .fail(err => {
        console.log(err);
        
    })
}



function auth(){

    if (localStorage.access_token){
        $('.btnLogout').show()
        $('.newFood').show()
        $('.listFood').show()
        $('.loginPage').hide()
        getFood()
       
    } else {
        $('.loginPage').show()
        $('.btnLogout').hide()
        $('.newFood').hide()
        $('.listFood').hide()
    }
}