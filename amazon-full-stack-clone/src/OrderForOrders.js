import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import styles from "./OrderForOrders.module.css";
import CurrencyFormat from "react-currency-format";

const OrderForOrders = ({ orderId, orderList }) => {
  const [{ user }, dispatch] = useStateValue();
  console.log("OrderList ::", orderList);
  let orderTotal = 0;
  return (
    <div className={styles.ofo__container}>
      <h3 className={styles.ofo__orderWithId}>{`Your Order #${orderId}`}</h3>
      <div>
        {orderList.map((item) => {
          orderTotal += +item.price;
          return (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              hide={true}
            />
          );
        })}
      </div>
      <CurrencyFormat
        renderText={(orderTotal) => (
          <h3
            className={styles.ofo__orderTotal}
          >{`Order Total ${orderTotal}`}</h3>
        )}
        decimalScale={2}
        value={orderTotal}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
};

export default OrderForOrders;
