import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import "./Payment.css";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const [{ basket, totalPrice, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  const baseURL = "http://127.0.0.1:5001/challenge-4317d/us-central1/api";

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  // useEffect(() => {
  //   //Generate the special stripe secret that allows us to charge a customer
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: "post",
  //       // *100 because stripe expects the total in currencies subunits
  //       url: baseURL + `/payments/create?total=${Math.round(totalPrice * 100)}`,
  //     });
  //     console.log("RESPONSE IS ::::  ", response);
  //     setClientSecret(response.data.clientSecret);
  //   };
  //   console.log("Generating Client Secret ...");
  //   getClientSecret();
  // }, [basket, processing]);

  const handleSubmit = async (event) => {
    // Do all fancy stripe things..
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // await stripe
    //   .confirmPayment(clientSecret, {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //     },
    //   })
    //   .then(({ paymentIntent }) => {
    //     // paymentIntent = payment Confirmation
    //     console.log("PAYMENT INTENT :: ", paymentIntent);
    //     setProcessing(false);
    //     setSucceeded(true);
    //     setError(null);
    //   });

      setProcessing(false);
      setSucceeded(true);
      setError(null);


    const userId = searchParams.get("userId");
    const orderId = searchParams.get("orderId");

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("userId", userId);
    urlSearchParams.append("orderId", orderId);
    navigate(`/order?${urlSearchParams.toString()}`);
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const { orderId, userId } = useParams();


  if(basket.length === 0) navigate('/');

  return (
    <div className="payment">
      <div className="payment__incart">
          <h1>{`In Cart ( ${basket.length} items )`}</h1>  
      </div>
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
            {basket?.map((basketItem) => (
              <CheckoutProduct
                key={basketItem.id}
                id={basketItem.id}
                title={basketItem.title}
                image={basketItem.image}
                price={basketItem.price}
                rating={basketItem.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment Section - Payment Method */}
        <div className="payment__section">
          <div className="payment__title">Payment Method</div>
          <div className="payment__details">
            {/* Stripe Magic will go ! */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  onClick={() => dispatch({ type: "EMPTY_BASKET" })}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
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
