import './Order.css';
// import moment from 'moment';
// import CheckoutProduct from './CheckoutProduct';

const Order = ({id,title,image,price,rating}) => {
    return (
      <div className='order'>
         <h2>Order</h2>
         {/* <p>{moment.unix(order.data.created).format('MMMM do YYYY, h:mma')}</p> */}
         <p className='order__id'>
            <small>{id}</small>
         </p>
         {
            // order.data.basket?.map(item=>(
            //     <CheckoutProduct
            //       id={item.id}
            //       title={item.title}
            //       image={item.image}
            //       price={item.price}
            //       rating={item.rating}/>
            //))
         }
      </div>
    );
}

export default Order;