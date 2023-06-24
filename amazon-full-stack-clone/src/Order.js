import { useEffect, useState } from "react";
import "./Order.css";
// import moment from 'moment';
import CheckoutProduct from "./CheckoutProduct";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import Button from "./Button";

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [orderListIndv, setOrderListIndv] = useState([]);
  // Access individual query parameters

  const orderId = searchParams.get("orderId");
  //const userId = searchParams.get('userId');
  console.log("Order ID : : ", orderId);
  const [{ basket, totalPrice, user }, dispatch] = useStateValue();
  let totalAmount = 0;
  useEffect(() => {
    const docRef = doc(db, user?.email, `${orderId}`);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()?.orders);
        const data = docSnap.data()?.orders;
        let ol = [];
        for (let field in data) {
          ol.push(data[field]);
        }
        console.log("ORDER LIST :: ", ol);
        setOrderListIndv(ol);
      } else {
        console.log("No such document!");
      }
    });
  }, []);

  return (
    <div className="order">
      <h2>Order</h2>
      {/* <p>{moment.unix(order.data.created).format('MMMM do YYYY, h:mma')}</p> */}
      <p className="order__id">
        <small>{orderId}</small>
      </p>
      <div>
        {orderListIndv.map((item) => {
          totalAmount += (+item.price);   
          return (<CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hide={true}
          />);
        })}
        <h4>{`Total Amount Paid is $${totalAmount}`}</h4>
        <h2 className="order__confirmation">
          Your order was placed successfully !!
        </h2>
      </div>
      <div className="buttons">
        <Button
          onClickMethod={() => {
            const urlSearchParams = new URLSearchParams();
            //urlSearchParams.append('userId',userId);
            urlSearchParams.append("orderId", orderId);
            navigate(`/orders?${urlSearchParams.toString()}`);
          }}
          actionText={"View All Orders"}
        />
        <Button
          onClickMethod={() => {
            navigate("/");
          }}
          actionText={"Continue Shopping with Us"}
        ></Button>
      </div>
    </div>
  );
};

export default Order;
