import './CheckoutProduct.css';

const CheckoutProduct = ({id,title,image,price,rating}) =>{

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
                <button>
                    Remove from Cart
                </button>
            </div>     
        </div>
    );
}

export default CheckoutProduct;