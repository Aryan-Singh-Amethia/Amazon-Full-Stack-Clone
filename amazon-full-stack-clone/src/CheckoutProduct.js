import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

const CheckoutProduct = ({id,title,image,price,rating}) =>{

    const [{basket,totalPrice},dispatcher] = useStateValue();

    const onRemoveHandler = () =>{
          dispatcher({
            type:'REMOVE_FROM_BASKET',
            id : id,
            price : price
          });
    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image'
                 src={image}/>
            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutProduct__rating'>
                    {Array(rating)
                     .fill()
                     .map(()=>(
                        <p>⭐</p>
                     ))}
                </div>
                <button onClick={onRemoveHandler}>
                    Remove from Cart
                </button>
            </div>     
        </div>
    );
}

export default CheckoutProduct;