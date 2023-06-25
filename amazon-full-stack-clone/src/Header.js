import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
const data = require("../src/resources/mock-data.json");

function Header() {
  const [{ basket, totalPrice, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  const [value, setValue] = useState("");

  const [fs, setFs] = useState([]);

  document.getElementById('search')
          .addEventListener('keyup',(event)=>{
            if(event.key==='Enter'){
                onSearchHandler();
            }
          })

  const onChangeHandler = (event) => {
    const searchText = event.target.value;
    const filteredSuggestions = data.data.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFs(filteredSuggestions);
    setValue(searchText);
  };

  const onSearchHandler = () =>{
    if(fs.length > 0 ){
        const suggestion = fs[0];
        const urlParams = new URLSearchParams();
        urlParams.append("title", suggestion.title);
        urlParams.append("image", suggestion.image);
        urlParams.append("rating", suggestion.rating);
        urlParams.append("price", suggestion.price);
        navigate(`/product-detail?${urlParams.toString()}`);
        setValue("");
    }
  }

//   let counter = 0;
//   useEffect(() => {
//     //console.log("Inside use effect !!");

//     if (value !== "" && fs.length > 0) {
//       document.getElementById(fs[0].id).style.backgroundColor = "#FBFFDC";
//       //document.getElementById(fs[0].id).style.backgroundColor='#FBFFDC';

//       for (let i = 0; i < fs.length; i++) {
//         document
//           .getElementById(fs[i].id)
//           .addEventListener("keydown", (event) => {
//             event.preventDefault();
//             console.log("Event Key ::", event.key);
//             if (event.key === "ArrowDown") {
//               console.log("inside if !!");
//               document.getElementById(fs[counter].id).style.backgroundColor='#FBFFDC';
//               counter = (counter + 1) % fs.length;
//             }
//           });
//       }
//     }
//   }, [fs]);

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Emblem.jpg"
          alt="Amazon Logo placeholder"
        />
      </Link>
      <div className="header__search">
        <input
          id="search"
          className="header__searchInput"
          type="text"
          value={value}
          onChange={onChangeHandler}
        />
        <div className="header__suggestions" id="search-suggestions">
          {value !== "" &&
            fs.map((suggestion, index) => {
              //console.log("item-id", suggestion.id);
              return (
                <div
                  key={suggestion.id}
                  id={suggestion.id}
                  className="suggestion"
                  onClick={() => {
                    const urlParams = new URLSearchParams();
                    urlParams.append("title", suggestion.title);
                    urlParams.append("image", suggestion.image);
                    urlParams.append("rating", suggestion.rating);
                    urlParams.append("price", suggestion.price);
                    navigate(`/product-detail?${urlParams.toString()}`);
                    setValue("");
                  }}
                >
                  <p>{suggestion.title}</p>
                </div>
              );
            })}
        </div>
      </div>
      <SearchIcon className="header__searchIcon" onClick={onSearchHandler}/>
      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div className="header__option" onClick={handleAuthentication}>
            <span className="header__optionLineOne">
              Hello <strong>{user ? user.email : "Guest"}</strong>
            </span>
            <span className="header__optionLineTwo">
              Sign-{`${user ? "Out" : "In"}`}
            </span>
          </div>
        </Link>
        <Link to={"/orders"}>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
