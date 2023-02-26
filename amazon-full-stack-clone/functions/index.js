const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request } = require("http");
const stripe = require("stripe")('sk_test_51McmhuSEw7WnUxNcOuM4K9Nd9GG1PkLyQF58tzTQtjPeORCnfhBzmRuCCJBq9IHZMgZtRGCMmDlMfIIvg1jVZL6w00t1zFwd1Q')

//API

// - App config
const app = express();

// - Middlewares
app.use(cors({origin:true}));
app.use(express.json());

// - API Routes
app.get('/',(request,response)=>{
    response.status(200).send('Hello World');
});

app.post('/payments/create',async (request,response)=>{
     const total = request.query.total;

     console.log('Payments Request received for amount :: ',total,' BOOM !!');

     const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency : "usd"
     });

     response.status(200).send({
        clientSecret : paymentIntent.clientSecret
     });
});

// -Listen Command
app.listen(4242, () => console.log('Running on port 4242'));
exports.api = functions.https.onRequest(app);

