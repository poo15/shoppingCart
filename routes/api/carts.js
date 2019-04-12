const Cart = require('../../db').Cart
const Product = require('../../db').Product
const route = require('express').Router()

route.post('/getCartTotal', (req,res) => {

    Cart.findAndCountAll({
        where:{
            userId: req.body.userId
        },
        include: [{model: Product}]
    })
    .then( (cart) =>{
            res.status(200).send(cart)
        })
    .catch( (error) =>{
            res.status(500).send(error)
        })
})

route.post('/',async (req,res) => {

    await Cart.findOne({
        where: {
            userId: req.body.userId,
            productId: req.body.productId
        }
    }).then(async (cart) => {
        if( cart == null ){
            await Cart.create({
                userId: req.body.userId,
                productId: req.body.productId
            }).then((cart) =>{
                res.status(201).send("Product Added to cart")
            }).catch((error)=>{
                res.status(501).send("Cart can't added")
            })
        } else{
             Cart.increment({ qty: 1 } ,
                                {  where: {
                                    userId:req.body.userId,
                                    productId:req.body.productId
                                  }
                                })
                    .then((cart) => {
                        res.status(200).send("Product Added to cart")
                    })
                    .catch((error) => {
                        res.status(500).send("Product not added to the Cart")
                    })
        }
    })
    .catch((error)=> {
        res.status(500).send("Product not added to the Cart")
    })
})


route.delete('/', (req,res) => {
    Cart.destroy( {
        where: {
            id:req.body.id
          }
    })
    .then( () =>{
        res.status(201).send("Product Deleted!!!")
    })
    .catch( (error) => {
        res.status(500).send("Could not delete product")
    })
})

route.post('/increment', async(req,res) => {
    await Cart.increment({ qty: 1 } ,
        {  where: {
            id:req.body.cartId
          }
        })
        .then((cart) => {
        res.status(200).send("Product Added to cart")
        })
        .catch((error) => {
        res.status(500).send("Product not added to the Cart")
        })
})

route.post('/decrement', async(req,res) => {
    await Cart.findOne({
        where: {
            id:req.body.cartId,
            qty:1
        }
    }). then(async (cart)=> {
        if(cart != null){
            await Cart.destroy( {
            where: {
                id:req.body.cartId
              }
            }).then(() => {
                res.status(200).send("Product removed from cart")
            }).catch((error) => {
                res.status(500).send("Something happend!!!");
            })
        } else{
            await Cart.decrement({ qty: 1 } ,
                {  where: {
                    id:req.body.cartId
                  }
                })
                .then((cart) => {
                res.status(200).send("Product decrement from cart")
                })
                .catch((error) => {
                res.status(500).send("Something happend!!!")
                })
        }
    }).catch((error)=>{
        res.status(500).send(error)
    })
    
})

exports = module.exports = route
