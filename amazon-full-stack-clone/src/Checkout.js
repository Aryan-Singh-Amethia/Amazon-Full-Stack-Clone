import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal.js";
import CheckoutProduct from "./CheckoutProduct";
import FlipMove from "react-flip-move";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [{ basket, totalPrice, user }, dispatch] = useStateValue();

  const navigate = useNavigate();
   

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          //  src="data:image/jpeg;base64,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"
          src="https://pbs.twimg.com/media/EzgnjHYXsAg0a-S.png"
          alt=""
        />
        <div className="checkout__title">
          <h3>Hello , {user ? user.email : "Guest"}</h3>
          <h2>Your Shopping Basket</h2>
        </div>
        {/* <CheckoutProduct
                  id='1234'
                  title="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
                  image="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/41T4dR2l76L.jpg"
                  price={76.88}
                  rating={3}/> */}
        <FlipMove>
          {basket?.map((item, index) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
          {basket.length === 0 && (
            <div className="checkout__emptycart">
              <img src="/empty-cart.png" 
                   alt="Empty Cart Image"
                   onClick={()=> navigate('/')} />
            </div>
          )}
        </FlipMove>
      </div>
      <div className="checkout__right">
        <Subtotal />
        <ToastContainer autoClose={500} />
      </div>
    </div>
  );
};

export default Checkout;
