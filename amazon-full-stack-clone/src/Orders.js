import { useEffect, useState } from "react";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import moment from "moment";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import OrderForOrders from "./OrderForOrders";


const Orders = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [{ basket, totalPrice, user }, dispatch] = useStateValue();
  let response = {};
  const orderItems = [];

  const getDataFromFireStore = () => {
    const collectionRef = collection(db, user?.email);
    getDocs(collectionRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const indvOrder = doc.data();
        //console.log('individual Order :: ',indvOrder);
        orderItems.push({
          orderId: indvOrder.id,
          orderList: indvOrder.orders,
        });
      });
    });
  };

  useEffect(() => {
    if (user) {
      console.log("Inside useEffect in Orders !!");
      getDataFromFireStore();
      console.log("Response :: ", response);
      setOrders(orderItems);
      console.log("ORDERS :: ", orderItems);
      setAmount(amount);
      // setDate(created);
    }
  }, []);
  console.log("ORDERS ::: ", orders);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__details">
        <h2>Order</h2>
        <h3>{moment.unix(date).format("MMMM do YYYY, h:mma")}</h3>
      </div>
      <div className="orders__order">
        {orders?.map((order) => (
          <OrderForOrders orderId={order.orderId} orderList={order.orderList} />
          // <CheckoutProduct
          //   id={item.id}
          //   title={item.title}
          //   image={item.image}
          //   price={item.price}
          //   rating={item.rating}
          //   hide={true}
          // />
        ))}
      </div>
      <div className="orders__total">
        <h2>Your Order Total : ${Math.round(amount * 100) / 100}</h2>
      </div>
    </div>
  );
};

export default Orders;
