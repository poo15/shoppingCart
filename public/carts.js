
function getCartItems(){

    fetchCart(function(cart){
        let loggedData = $('#loginData')
        console.log(cart.rows)
        loggedData.empty()
        loggedData.append(` <a href="carts.html" class="alert-link" ><i  class="fas fa-shopping-cart"><span class="ml-1 badge badge-primary badge-pill">${cart.count}</span></i></a>
        <button class="btn btn-secondary my-2 my-sm-0" onClick="logout()" type="submit">Logout</button>`)

        let i = 1
        let cartTotal =0
        let itemsList = $('#itemsList')
        itemsList.empty()
        for( item of cart.rows){
            console.log(item.id)

            itemsList.append(
                `<tr>
                <th scope="row">${i++}</th>
                <td>${item.product.name}</td>
                <td>Rs. ${item.product.price}</td>
                <td>${item.qty}</td>
                <td>Rs. ${item.product.price * item.qty}</td>
                <td><button class="btn btn-primary btn-sm mr-2" onClick="incrementToCart(${item.id})"><i class="fas fa-plus "></i></button>
                    <button class="btn btn-primary btn-sm mr-2" onClick="decrementToCart(${item.id})"><i class="fas fa-minus "></i></button>
                    <button class="btn btn-primary btn-sm" onClick="deleteCartItem(${item.id})"><i class="fas fa-trash-alt"></i></button>
                </td>
                </tr>`
            )
            cartTotal += item.product.price * item.qty
        }
        itemsList.append(`<tr align="right" class="table-primary"><td colspan="6">Total Amount:- Rs. ${cartTotal}</td></tr>`)


    })
}

function deleteCartItem(id){
    console.log("button clicked to delte id:- "+ id)
    $.ajax({
        url: '/carts',
        type: 'DELETE',
        data: {
            id:id
        },
        success: function(result) {
            alert("Item delted")
            getCartItems()
        }
    });
}

function logout(){
    console.log("in logout")
    sessionStorage.clear()
    window.location = "index.html"
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
        window.location = "index.html"
    }else{
        getCartItems()
        
    }
})

function incrementToCart(cartId){
    console.log("add to cart clicked item id:- "+cartId+" user Id :- "+sessionStorage.getItem("userId"))
    $.post('/carts/increment',{
        cartId: cartId
    }, function (data){
        alert(data)
        location.reload()
    })
}

function decrementToCart(cartId){
    console.log("add to cart clicked item id:- "+cartId+" user Id :- "+sessionStorage.getItem("userId"))
    $.post('/carts/decrement',{
        cartId: cartId
    }, function (data){
        window.alert(data)
        location.reload()
    })
}

