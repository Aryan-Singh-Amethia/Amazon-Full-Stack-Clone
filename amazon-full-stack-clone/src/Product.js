import './Product.css';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';

const Product = ({id,title,image,price,rating}) =>{
   
   const [{basket,user}, dispatch] = useStateValue();
   console.log("this is the basket >>>",basket);
   const navigate = useNavigate();
   const addToCartHandler = () =>{
      
      if(!user){
         alert('Please Sign-In before adding items to cart !!');
         navigate('/login');
      }else{
      dispatch({
         type : 'ADD_TO_BASKET',
         item : {
            id : id ,
            title : title ,
            image : image ,
            price : price ,
            rating : rating
         }
      });
   }
   };

   return (
     <div className='product'>
        <div className='product__info'>
           <p>{title}</p>
           <p className='product__price'>
            <small>$</small>
            <strong>{price}</strong>
           </p>
           <div className='product__rating'>
            {Array(rating).fill().map((_,i)=>(<p>⭐</p>))}
           </div>
        </div>
        <img src={image}
             alt="product_img"/>
        <button onClick={addToCartHandler}>Add to Basket</button>     
     </div>
   );
};

export default Product;