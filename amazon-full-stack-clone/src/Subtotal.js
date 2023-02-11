import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";

const Subtotal = () =>{
   const [{basket,totalPrice} , dispatcher] = useStateValue();
   console.log('CONTEXT :: ',basket);
   return(
    <div className="subtotal">
       <CurrencyFormat
         renderText = {(value) => (
            <div>
            <p>
                {/*Part of Homework */}
                Subtotal (<strong>{basket?.length}</strong> items) : <strong>{value}</strong> 
            </p>
            <small className="subtotal__gift">
                <input type="checkbox"/>
                This order contains a gift.
            </small>
            </div>

         )}
         decimalScale={2}
         value={totalPrice}
         displayType={"text"}
         thousandSeparator={true}
         prefix={"$"}/>

         <button>Proceed To Checkout</button>
    </div>
   );
};

export default Subtotal;