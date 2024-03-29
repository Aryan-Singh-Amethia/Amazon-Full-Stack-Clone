import Button from './Button';
import './Product.css';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Product = ({id,title,image,price,rating,addToCartBtn}) =>{
   
   const [{basket,user}, dispatch] = useStateValue();
   //console.log("this is the basket >>>",basket);
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
     <div className='product' onClick={()=>{
      const urlParams = new URLSearchParams();
      urlParams.append('title',title);
      urlParams.append('image',image);
      urlParams.append('rating',rating);
      urlParams.append('price',price);
      navigate(`/product-detail?${urlParams.toString()}`);
     }}>
        <div className='product__info'>
           <p>{title}</p>
           <p className='product__price'>
            <small>$</small>
            <strong>{price}</strong>
           </p>
           <div className='product__rating'>
            {Array(rating).fill().map((_,i)=>(<p key={i}>⭐</p>))}
           </div>
        </div>
        <img src={image}
             alt="product_img"/>
        {addToCartBtn && <Button onClickMethod={(event)=>{
          event.stopPropagation();
          toast.success('Item Added to cart !!', {
            autoClose:1000,
            position : toast.POSITION.TOP_LEFT
            });
          addToCartHandler();
        }} actionText={'Add to Basket'}/>}     
     </div>
   );
};

export default Product;