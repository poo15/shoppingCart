const Vendor = require('../../db').Vendor
const route = require('express').Router()

route.get('/',(req,res) => {

    Vendor.findAll()
            .then((vendors) => {
                res.status(200).send(vendors)
            })
            .catch((err) => {
                res.status(500).send({
                    error: "Could not retrive users"
                })
            })
})

route.post('/',(req,res) =>{
    Vendor.create({
        name: req.body.name
    }).then((user) => {
        res.status(201).send(user)
    }).catch((err) => {
        res.status(501).send({
            error:"coludn't add user"
        })
    })

})

route.delete('/', (req,res) => {
    Vendor.destroy( {
        where: {
            id:req.body.id
          }
    })
    .then( () =>{
        res.status(201).send("deleted")
    })
    .catch( (error) => {
        res.status(500).send("Could not delete product")
    })
})

exports = module.exports = route