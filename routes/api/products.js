const Products = require('../../db').Product
const route = require('express').Router()

route.get('/', (req,res) => {
    Products.findAll()
            .then( (Products) =>{
                res.status(200).send(Products)
            })
            .catch( (error) =>{
                res.status(500).send({
                    error: "Could get products"
                })
            })
})

route.post('/', (req,res) =>{
    console.log("product to add "+req.body)
    if(isNaN(req.body.price)){
        return res.status(403).send({
            error: "Price is not valid number"
        })
    }
    if(isNaN(req.body.quantity)){
        return res.status(403).send({
            error: "Quantity is not valid number"
        })
    }

    Products.create( {
        name: req.body.name,
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity),
        vendorId: parseInt(req.body.vendorId)
    })
    .then( (product) =>{
        res.status(201).send(product)
    })
    .catch( (error) => {
        res.status(500).send("Could not add product")
    })
})


route.delete('/', (req,res) => {
    Products.destroy( {
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