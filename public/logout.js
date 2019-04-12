$(function logoutUser() {
    
    $('#logout').click( function () {
       console.log("in logout")
       sessionStorage.clear()
       location.reload()
    })
})