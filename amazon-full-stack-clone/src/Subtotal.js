import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import {db} from './firebase';
import { getDoc , doc , setDoc , addDoc, collection} from "firebase/firestore";
import { v4 as uuid } from 'uuid';

const Subtotal = () => {
  const [{ basket, totalPrice ,user}, dispatch] = useStateValue();
  //console.log("CONTEXT :: ", basket);
  const history = useNavigate();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div>
            <p>
              {/*Part of Homework */}
              Subtotal (<strong>{basket?.length}</strong> items) :{" "}
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift.
            </small>
          </div>
        )}
        decimalScale={2}
        value={totalPrice}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button
        className="checkout__btn"
        onClick={async (e) => {
          if (basket?.length === 0) {
            alert(
              "There are no items in your cart !! Please add some items to proceed to checkout !!"
            );
            history("/");
          } else {
            // const parentDocRef = doc(db, "users", user?.email);
            // const childDocRef = doc(parentDocRef,`order_with_id_${uuid()}`);
            
            let childData = basket.map((item)=>{
              return {
                id : item.id,
                title : item.title,
                price : item.price,
                image : item.image,
                rating : item.rating
              }  
            });
            //const userRef = db.collection("users").document(`${user.email}`);
            const orderId = `order_with_id_${uuid()}`;
            const childPayload = {
                                  ...childData
                                };
            const userEmailRef = doc(db,`${user?.email}`,`${orderId}`);
            // Add a new document with a generated id.
            const docRef = await setDoc(userEmailRef,{
              orderId : orderId,
              orders : childData
            });
            //console.log("Document written with ID: ", docRef.id);
            //const userId = docRef.id;
            const urlParams  = new URLSearchParams();
            urlParams.append('orderId',orderId);
            //urlParams.append('userId',userId);
            history(`/payments?${urlParams.toString()}`);
          }
        }}
      >
        Proceed To Checkout
      </button>
    </div>
  );
};

export default Subtotal;
