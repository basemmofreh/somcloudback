const AuthController = require('./controllers/AuthController');
const express = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_7MtY1LY7vRDC9GYPGOMl9EZv00pM9Eku1S");


router.get('/confirmSignup', AuthController.confirmSignup);
router.get('/health' , (req, res, next) => {  res.send('ok')})
router.post('/api/donate', async(req,res,next)=>{
    const token = req.body.payload.token.id; // Using Express
    const total = req.body.total;
    //user info to be stored 
    const user = req.body.info;
    console.log(token);
    console.log(user);
    try{
        const charge = await stripe.charges.create({
        amount:Number(total)*100,
        currency: 'usd',
        description: 'Example charge',
        source: token,
        });
        if(charge){
            res.status(200).send("success");
            next();
        }
            
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }

 
});
module.exports = router;