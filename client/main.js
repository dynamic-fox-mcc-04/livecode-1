let baseUrl = "http://localhost:3000"
$(document).ready(function(){
  });

function authentication()
{
    if(localStorage.token)
    {
        $("#app").show();
        $("#login").hide();
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
        console.log(data);
        localStorage.token = data.access_token;
    })
    .fail(err =>
    {
        console.log(err)
    })
}