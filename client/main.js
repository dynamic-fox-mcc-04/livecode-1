let baseUrl = "http://localhost:3000"
$(document).ready(function(){
    authentication();
  });

function authentication()
{
    if(localStorage.token)
    {
        $("#app").show();
        $("#login").hide();
        show();
    }
    else
    {
        $("#app").hide();
        $("#login").show();
    }
}

function login(event)
{
    event.preventDefault();
    $.ajax({
        type : "POST",
        url: baseUrl + "/login",
        data: {
            email: $("#exampleInputEmail1").val(),
            password : $("#exampleInputPassword").val(),
        }
    })
    .done(data =>
    {
        // console.log(data);
        localStorage.token = data.access_token;
        authentication();
    })
    .fail(err =>
    {
        console.log(err)
    })
}

function logout(event)
{
    event.preventDefault();
    localStorage.clear();
    authentication();
}

function create(event)
{
    event.preventDefault();
    $.ajax({
        type : "POST",
        url: baseUrl + "/foods",
        data: {
            title : $("#title-create").val(),
            price : $("#price-create").val(),
            ingredients : $("#ingredients-create").val(),
            tag : $("#tag-create").val()
        },
        headers:
        {
            token : localStorage.token
        }
    })
    .done(data =>
    {
        // console.log(data);
        // show();
        authentication();
    })
    .fail(err =>
    {
        console.log(err)
    })
}

function show()
{
    $.ajax({
        type : "GET",
        url: baseUrl + "/foods",
        headers:
        {
            token : localStorage.token
        }
    })
    .done(data =>
    {
        // console.log(data);
        for(let i in data)
        {
            
            let add =
            `<div class="card" id="${data[i].id}">
            <div class="card-body pb-0">
            <div class="d-flex justify-content-between mb-0">
            <div class="col-9">
            <h5 class="font-weight-bold">${data[i].title} </h5>
            <p>Rp.${data[i].price}</p>
            </div>
            <div class="col-3 d-flex align-items-baseline">
            <i class="fas fa-tag text-grey mr-2"></i>
            <p class="text-grey">${data[i].tag}</p>
            <button class="fas fa-trash text-danger ml-auto cursor-pointer"></button>
            </div>
            </div>
            <div class="card-body border-bottom">
            ${data[i].ingredients}
            </div>
            
            </div>
            </div>`
            $(`#${data[i].id}`).remove();
            $("#list").prepend(add);
        }
    })
    .fail(err =>
    {
        console.log(err)
    })
}