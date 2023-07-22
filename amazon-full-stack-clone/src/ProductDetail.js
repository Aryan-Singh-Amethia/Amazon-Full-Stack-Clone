import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import Product from './Product';
import Button from './Button';
import './ProductDetail.css';
import { ToastContainer } from 'react-toastify';

const ProductDetail = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const title = urlParams.get('title');
  const image = urlParams.get('image');
  const price = urlParams.get('price');
  const rating = urlParams.get('rating');
  const navigate = useNavigate();
  return (
    <div className='main__product'>
       <ToastContainer autoClose={2000} />
       <Product
         id={uuid()}
         title={title}
         image={image}
         price={price}
         rating={rating}
         addToCartBtn={true}/>
        <Button
          onClickMethod={()=>navigate('/')}
          actionText={'Back To Home'}/>
    </div>
  )
}

export default ProductDetail