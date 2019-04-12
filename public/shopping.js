function fetchProducts(done){
    $.get('/products', function (data) {
        done(data)
    })
}

function createProductCard(product){
    console.log(sessionStorage.getItem("userName"))
    let obj= 
        `<div class="col-lg-4">
        <div class="card text-white bg-success mb-3" style="max-width: 20rem;">
        <div class="card-header">${product.name}</div>
        <img style="height: 200px; width: 100%; display: block;" src="images/im1.jfif" alt="Card image">
        <div class="card-body">
          <h4 class="card-title"></h4>
          <p class="card-text"><b>Price:- </b>${product.price} `
          if(sessionStorage.getItem("userName")!=null)   
            obj+=`<form><button type="button" onClick="addToCart(${product.id})" class="btn btn-primary">Buy</button></form>`

            obj +=`</p>
                    </div>
            </div></div>`

        return obj
}

function getProductsList(){
    let productList = $('#product-list')
    fetchProducts(function(products) {
        productList.empty()
        for(product of products) {
            productList.append(createProductCard(product))
        }
    })
}

function getCartItems(){

    fetchCart(function(cart){
        let loggedData = $('#loginData')
        loggedData.empty()
        loggedData.append(` <a href="carts.html" class="alert-link" ><i  class="fas fa-shopping-cart"><span class="ml-1 badge badge-primary badge-pill">${cart.count}</span></i></a>
        <button class="btn btn-secondary my-2 my-sm-0" onClick="logout()" type="submit">Logout</button>`)
    })
}

function logout(){
    console.log("in logout")
    sessionStorage.clear()
    location.reload()
}

function fetchCart(done){
    console.log(sessionStorage.getItem("userId"))
    $.post('/carts/getCartTotal',{
            userId: sessionStorage.getItem("userId")},
            function (data) {
                done(data)
    })
}


$(function getProducts() {
    if(sessionStorage.getItem("userName") == null){
        let form = $('#formAppend')

        form.empty()
        form.append(` <form>
        <fieldset>
          <legend>Users</legend>
          <div class="row">
                <div class="col-lg-6">
                    <div class="form-group row">
                        <label for="userName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" id="userName" placeholder="Enter User Name">
                        </div>
                    </div>
                  </div> 
                  
                  <div class="col-lg-6">
                  <button  type="submit" id="loginUser" class="btn btn-primary">Login</button>
              </div>
        </fieldset>
      </form>
       `)
    }else{
        getCartItems()
        
    }
    let userName = $('#userName')
    
    $('#loginUser').click( function () {
        loginUser(
            userName.val(),
            function(loginUser){
                sessionStorage.setItem("userName",loginUser.name)
                sessionStorage.setItem("userId",loginUser.id)
               getProductsList()
               
            })
    })
    getProductsList()
})


function loginUser(name,done){
    $.post('/users',{
        name: name,
    }, function (data) {
        done(data)
    })
}


function addToCart(id){
    $.post('/carts',{
        productId: id,
        userId: sessionStorage.getItem("userId")
    }, function (data){
        alert(data)
        location.reload()
    })
}