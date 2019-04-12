const User = require('../../db').User
const route = require('express').Router()

route.get('/', async (req,res) => {
   await User.findAll()
            .then( (User) =>{
                res.status(200).send(User)
            })
            .catch( (error) =>{
                res.status(500).send({
                    error: "Could not get user"
                })
            })
})

route.post('/',async (req,res) =>{
    await User.findOne({
        where : {
            name: req.body.name
        }
    }).then(async (user) =>{
         if(user==null) {
            await User.create({
                name: req.body.name
            }).then((user) => {
                res.status(201).send(user)
            }).catch((err) => {
                res.status(501).send({
                    error:"coludn't add user"
                })
            })
         } 
         else{
            res.status(201).send(user)
         }
    }) .catch((err) => {
        res.status(501).send({
            error:"coludn't add user"
        })
    })
    

})
exports = module.exports = route