const express = require("express")
const path = require("path")
const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(require('./routes/api').route)

app.use(express.static(path.join(__dirname,'public')))

const PORT = process.env.PORT || 8888 

app.listen(PORT, ()=>{
    console.log('Server listenig at '+PORT)
})  