let urlmaster = 'http://localhost:3000'
$(document).ready(function(event){
    $("formlogin").show()
    $("menu").hide()
})
function login(event){
    event.preventDefault();
    let email = $('#email').val()
    let pass =  $('#password').val()
    console.log(email,pass);
    $.ajax({
        method:'POST',
        url:urlmaster+'/login',
        data:{
            email,
            pass
        }
    })
    .done(result=>{
        console.log(result)
        
        localStorage.setItem('token',result.access_token)
        $("formlogin").hide()
        $("menu").show()
    })
    .catch(err=>{
        console.log(err)
    })
}