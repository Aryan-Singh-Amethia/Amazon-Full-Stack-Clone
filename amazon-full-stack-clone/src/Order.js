import { useEffect, useState } from 'react';
import './Order.css';
// import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useStateValue } from './StateProvider';
import { db } from './firebase';
import Button from './Button';

const Order = () => {
   
   const navigate = useNavigate();
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const [orderList,setOrderList] = useState([]);
   // Access individual query parameters
   const orderId = searchParams.get('orderId');
   const userId = searchParams.get('userId');

   const [{ basket, totalPrice ,user}, dispatch] = useStateValue();
   
   useEffect(()=>{
      const docRef = doc(db,'users',user?.email,`order_with_id_${orderId}`,userId);
      getDoc(docRef)
      .then(docSnap=>{
         if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            const data = docSnap.data();
            let ol =[];
            for(let field in data){
               ol.push(data[field]);
            }
            console.log('ORDER LIST :: ',orderList);
            setOrderList(ol);
          } else {
            console.log("No such document!");
          }
      })
   },[]);

    return (
      <div className='order'>
         <h2>Order</h2>
         {/* <p>{moment.unix(order.data.created).format('MMMM do YYYY, h:mma')}</p> */}
         <p className='order__id'>
            <small>{orderId}</small>
         </p>
         <div>
         {
               orderList?.map(item=>(
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image ={item.image}
                  price={item.price}
                  rating={item.rating}
                  hide={true}
                  />
            ))
          }
          <h2 className='order__confirmation'>Your order was placed successfully !!</h2>
         </div>
          <div className='buttons'>
          <Button
           onClickMethod={()=>{
            navigate('/orders');
           }}
           actionText={'View All Orders'}
           />  
          <Button
           onClickMethod={()=>{
              navigate('/');
           }}
           actionText={'Continue Shopping with Us'}>
          </Button> 

          </div>
      </div>
    );
}

export default Order;