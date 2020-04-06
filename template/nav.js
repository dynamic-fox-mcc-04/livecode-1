function NotSignedIn() {
    console.log('not signed in')
    $('#LoginPage').show()
    $('#MainPage').hide()
}
function SignedIn() {
    console.log('signed in')
    $('#LoginPage').hide()
    $('#MainPage').show()
}
function GenerateFood() {
    $.ajax({
        url: 'http://localhost:3000/foods',
        method:'GET',
        headers: {
            access_token : localStorage.getItem('access_token')
        }
    })
        .done(function(result) {
            console.log(result)
            $('#FoodList').empty()
            for(let i = 0; i < result.length; i++) {
                $('#FoodList').append(`
                <div class="col-md-10" id="Food-${result[i].id}">
                <div class="card">
                  <div class="card-body pb-0" style="width: 70vw;">
                    <div class="d-flex justify-content-between mb-0" style="width: 55vw;">
                      <div class="col-9">
                        <h5 class="font-weight-bold">${result[i].title}</h5>
                        <p>Rp.${result[i].price}</p>
                      </div>
                      <div class="col-3 d-flex align-items-baseline">
                        <i class="fas fa-tag text-grey mr-2"></i>
                        <p class="text-grey">${result[i].tag}</p>
                        <button class="fas fa-trash text-danger ml-auto cursor-pointer" id="Delete-${result[i].id}"></button>
                      </div>
                    </div>
                    <div class="card-body border-bottom">
                      ${result[i].ingredients}
                    </div>
      
                  </div>
                </div>
              </div>
                `)

                $(`#Delete-${result[i].id}`).on('click', function(e) {
                    e.preventDefault()
                    console.log(`#Delete-${result[i].id}`)
                    $.ajax({
                        url: `http://localhost:3000/foods/${result[i].id}`,
                        method: 'DELETE',
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                    .done(result => {
                        console.log(result)
                        GenerateFood()
                    })
                    .fail(err => {
                        console.log(err)
                    })
                })

            }
        })
        .fail(function(err) {
            console.log('error fetch food', err)
        })
}