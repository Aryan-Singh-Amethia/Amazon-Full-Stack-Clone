import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import './Payment.css';
import { useElements ,useStripe ,CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore"; 

const Payment = () =>{
    const [{basket , totalPrice , user} , dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    const [succeeded,setSucceeded] = useState(false);
    const [processing,setProcessing] = useState(false);
    const [clientSecret,setClientSecret] = useState(true);

    const baseURL ='http://127.0.0.1:5001/challenge-4317d/us-central1/api';

    useEffect(()=>{
        //Generate the special stripe secret that allows us to charge a customer
        const getClientSecret = async () =>{
           const response = await axios({
            method : "post" ,
            // *100 because stripe expects the total in currencies subunits
            url : baseURL+`/payments/create?total=${Math.round(totalPrice*100)}`
           });
           console.log('RESPONSE IS ::::  ',response);
           setClientSecret(response.data.clientSecret); 
        };
        getClientSecret();
    },[basket]);

    const handleSubmit = async (event) =>{
        // Do all fancy stripe things..
         event.preventDefault();
         setProcessing(true);


        // Temp Fix for Payment issue  
         
         await setDoc(doc(db,'users',user?.uid),{
            basket : basket ,
            amount : totalPrice,
            created : new Date()
         });
         navigate('/orders'); // Temporary Fix

         //Temp Fix ends here

        // await stripe.confirmPayment(clientSecret,{
        //     payment_method  : {
        //         card : elements.getElement(CardElement)
        //     }
        //  }).then(({paymentIntent})=>{
        //     // paymentIntent = payment Confirmation
        //     console.log('PAYMENT INTENT :: ',paymentIntent);
        //     setProcessing(false);
        //     setSucceeded(true);
        //     setError(null);

        //     // db.collection('users')
        //     //   .doc(user?.uid)
        //     //   .collection('orders')
        //     //   .doc(paymentIntent.id)
        //     //   .set({
        //     //     basket : basket ,
        //     //     amount : paymentIntent.amount,
        //     //     created : paymentIntent.created
        //     //   })

        //     dispatch({
        //         type:'EMPTY_BASKET'
        //     });

        //     navigate('/orders');
        //  }).catch(error=>console.log(error));
         

    };
    const handleChange = (event) =>{
         setDisabled(event.empty);
         setError(event.error?event.error.message:"");
    };
    return(
        <div className="payment">
            <div className="payment__container">
                {/* Payment Section - Delivery Address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles,CA</p>
                    </div>
                </div>
                {/* Payment Section - Review items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                         {basket?.map(basketItem =>(
                            <CheckoutProduct
                            id={basketItem.id}
                            title={basketItem.title}
                            image={basketItem.image}
                            price={basketItem.price}
                            rating={basketItem.rating}/>
                         ))}
                    </div> 
                    
                </div>
                {/* Payment Section - Payment Method */}
                <div className="payment__section">
                    <div className="payment__title">
                        Payment Method
                    </div>
                    <div className="payment__details">
                        {/* Stripe Magic will go ! */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment__priceContainer">
                            <CurrencyFormat
                             renderText = {(value) => (
                              <h3>Order Total : {value}</h3>
                          )}
                          decimalScale={2}
                          value={totalPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}/>
                          <button disabled={ processing || disabled || succeeded}>
                            <span>
                                {processing?<p>Processing</p>:"Buy Now"}
                            </span>
                          </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;