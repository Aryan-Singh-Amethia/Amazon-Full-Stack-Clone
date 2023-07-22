import { forwardRef } from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
import Button from './Button';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CheckoutProduct = forwardRef(({id,title,image,price,rating,hide},ref)=>{

    const [{basket,totalPrice},dispatcher] = useStateValue();

    const onRemoveHandler = () =>{
          dispatcher({
            type:'REMOVE_FROM_BASKET',
            id : id,
            price : price
          });
    }

    return (
        <div className='checkoutProduct' ref={ref}>
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
                     .map((index)=>(
                        <p key={index}>⭐</p>
                     ))}
                </div>
                {!hide &&
                    <Button
                      onClickMethod={
                        ()=>{
                        toast.warn('Removing Item rom Cart !!',
                        {
                            autoClose:1000
                        })
                        dispatcher({
                            type:'REMOVE_FROM_BASKET',
                            id : id,
                            price : price
                          });
                
                    }
                    }
                      actionText={'Remove from Cart'}
                    />
                }
            </div>     
        </div>
    );
});

export default CheckoutProduct;