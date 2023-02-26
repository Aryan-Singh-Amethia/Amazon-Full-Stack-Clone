 import "./Home.css";
 import Product from "./Product";

const Home = () =>{

    return(
        <div className="home">
           <div className="home__container">
             <img className="home__image"
             //     src="https://netrockdeals.sirv.com/amazon%20prime%20banner.jpg"
               src="https://amazon-clone-with-stripe-payment.netlify.app/images/banner.jpg"
               alt="prime-background-image"/>
           </div>
           <div className="home__row">
             <Product
                id={1}
                title="The Lean Startup Paperback, Ries Eric  (Paperback, Ries Eric)"
                image="https://m.media-amazon.com/images/I/81vvgZqCskL.jpg"
                price="29.99"
                rating={5}/>
             <Product
                id={2}
                title="Soflin Electric Hand Mixer 180 W Hand Blender  (Multicolor)"
                image="https://rukminim1.flixcart.com/image/832/832/kerfl3k0/hand-blender/t/a/e/ddarsh-hand-mixer-blender-easy-mix-200w-with-7-speed-control-and-original-imafvddcgghhxg5g.jpeg?q=70"
                price="35.69"
                rating={3}/>
           </div>
           <div className="home__row">
             <Product
                id={3}
                title="FITBIT Charge 5 Smartwatch  (Black Strap, Small|Large)"
                image="https://rukminim1.flixcart.com/image/832/832/xif0q/smartwatch/6/k/n/1-04-fb421bkbk-frcjk-android-ios-fitbit-no-original-imagh465atkjdrg8.jpeg?q=70"
                price="16.99"
                rating={4}/>
             <Product
                id={4}
                title="Echo (4th Gen, 2020 release) | Premium sound powered by Dolby and Alexa (Black) "
                image="https://m.media-amazon.com/images/I/61dgl2srHDL.jpg"
                price="99.99"
                rating={5}/>
             <Product
                id={5}
                title="Samsung 138 cm (55 inches) The Frame Series 4K Ultra HD Smart QLED TV QA55LS03AAKLXL (Black)"
                image="https://m.media-amazon.com/images/I/81V+s2BBy3L._AC_UY327_QL65_.jpg"
                price="569.99"
                rating={4}/>
           </div>
           <div className="home__row">
            <Product
                id={6}
                title="Apple 2020 MacBook Air Laptop M1 chip, 13.3-inch/33.74 cm Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver"
                image="https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg"
                price="199.99"
                rating={5}/>  
           </div>  
        </div>
    );
};

export default Home;