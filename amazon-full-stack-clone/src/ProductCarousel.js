import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";
import { v4 as uuid } from "uuid";
import "./ProductCarousel.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const ProductCarousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);



  const getDataFromFirebase = async () => {
    let carouselItemsData = [];
    await getDocs(collection(db, "carouselItems"))
    .then(res=>res.forEach((doc) => {
          carouselItemsData.push({
            "id":doc.data().id,
            "title":doc.data().title,
            "image":doc.data().image,
            "price":doc.data().price,
            "rating":doc.data().rating
          });
        }));
    
    return carouselItemsData;
  };

  useEffect(() => {
    const data = getDataFromFirebase();
    data.then((res)=>{
        console.log("Fetched Carousel Items :: ", res);
        setCarouselItems(res);
    })
        .catch(err => console.log('Error while fetching carousel items from firebase!!',err));
  },[]);

  return (
    <div className="carousel__container">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1500}
        customTransition="all .2"
        infinite={true}
      >
        {carouselItems?.map((product)=>
            (<div key={product.id} className="carousel__item"> 
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  rating={product.rating}
                />
              </div>))}
        <div className="carousel__item">
          <Product
            id={uuid()}
            title="The Lean Startup Paperback, Ries Eric  (Paperback, Ries Eric)"
            image="https://m.media-amazon.com/images/I/81vvgZqCskL.jpg"
            price="29.99"
            rating={5}
          />
        </div>
        <div className="carousel__item">
          <Product
            id={uuid()}
            title="Soflin Electric Hand Mixer 180 W Hand Blender  (Multicolor)"
            image="https://rukminim1.flixcart.com/image/832/832/kerfl3k0/hand-blender/t/a/e/ddarsh-hand-mixer-blender-easy-mix-200w-with-7-speed-control-and-original-imafvddcgghhxg5g.jpeg?q=70"
            price="35.69"
            rating={3}
          />
        </div>
        <div className="carousel__item">
          <Product
            id={uuid()}
            title="FITBIT Charge 5 Smartwatch  (Black Strap, Small|Large)"
            image="https://rukminim1.flixcart.com/image/832/832/xif0q/smartwatch/6/k/n/1-04-fb421bkbk-frcjk-android-ios-fitbit-no-original-imagh465atkjdrg8.jpeg?q=70"
            price="16.99"
            rating={4}
          />
        </div>
        <div className="carousel__item">
          <Product
            id={uuid()}
            title="Echo (4th Gen, 2020 release) | Premium sound powered by Dolby and Alexa (Black) "
            image="https://m.media-amazon.com/images/I/61dgl2srHDL.jpg"
            price="99.99"
            rating={5}
          />
        </div>
        <div className="carousel__item">
          <Product
            id={uuid()}
            title="Apple 2020 MacBook Air Laptop M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver"
            image="https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg"
            price="199.99"
            rating={5}
          />
        </div>
        <div className="carousel__item">
          <Product
            id={uuid()}
            title="Samsung 138 cm (55 inches) The Frame Series 4K Ultra HD Smart QLED TV QA55LS03AAKLXL (Black)"
            image="https://m.media-amazon.com/images/I/81V+s2BBy3L._AC_UY327_QL65_.jpg"
            price="569.99"
            rating={4}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
