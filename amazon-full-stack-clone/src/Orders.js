import { useEffect, useState } from 'react';
import { db } from './firebase';
import './Orders.css';
import { useStateValue } from './StateProvider';
import moment from 'moment';
import { doc, getDoc } from "firebase/firestore";
import CheckoutProduct from './CheckoutProduct';

const Orders = () =>{
    const [orders,setOrders] = useState([]);
    const [date,setDate] = useState(new Date());
    const [amount ,setAmount] =useState(0);
    const [{basket , totalPrice , user} , dispatch] = useStateValue();
    let response = {};
    useEffect( ()=>{
       if(user){
        const orderItems = [];
        const getDataFromFireStore = async ()=>{
        const docRef = doc(db,'users',user?.uid);
        const docSnap = await getDoc(docRef);
        response = docSnap.data();
        console.log('DOC DATA :::: ',response);
        const {amount , basket : basketII , created } = response;//object destructuring
        console.log('AMOUNT ::: ',amount);
        console.log('BASKET ::: ',basketII);
        console.log('CREATED ::: ',created);
        setOrders(basketII);
        setAmount(amount);
        setDate(created);
       };
        getDataFromFireStore();
        //  db.collection('users')
        //    .doc(user?.uid)
        //    .collection('orders')
        //    .orderBy('created','desc')
        //    .onSnapshot(snapshot =>{
        //     snapshot.docs.map(doc=>({
        //         id : doc.id,
        //         data : doc.data()
        //     }))
        //    })

       }else{
        setOrders([]);
       }
    },[user]);
    console.log('ORDERS ::: ',orders);
    return(
        <div className='orders'>
             <h1>Your Orders</h1>
             <div className='orders__details'>
                <h2>Order</h2>
                <h3>{moment.unix(date).format('MMMM do YYYY, h:mma')}</h3>
             </div>
             <div className='orders__order'>
                {
                    orders?.map(item => (
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        hide={true}/>
                    ))
                }
             </div>
             <div className='orders__total'>
                <h2>Your Order Total : ${Math.round(amount*100)/100}</h2>
             </div>
        </div>
    );
}

export default Orders;