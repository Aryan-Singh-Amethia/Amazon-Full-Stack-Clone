import './Header.css';
import AmazonLogo from './resources/amazon-logo.jpg';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Header() {

    const [{basket},dispatch] = useStateValue();

    return (
        <div className='header'>
           <Link to="/">
           <img
             className='header__logo'
             src='https://logos-world.net/wp-content/uploads/2020/04/Amazon-Emblem.jpg'
             alt="Amazon Logo placeholder"/>
           </Link>
           <div className='header__search'>
             <input 
              className='header__searchInput'
              type='text'/>
             <SearchIcon
               className='header__searchIcon'/>
            </div>
            <div className='header__nav'>
                <Link to='/login'>
                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Hello Guest
                    </span>
                    <span className='header__optionLineTwo'>
                        Sign In
                    </span>
                </div>
                </Link>
                <div className='header__option'>
                <span className='header__optionLineOne'>
                        Returns
                    </span>
                    <span className='header__optionLineTwo'>
                       & Orders
                    </span>
                </div>
                <div className='header__option'>
                <span className='header__optionLineOne'>
                        Your
                    </span>
                    <span className='header__optionLineTwo'>
                        Prime
                    </span>
                </div>
                <Link to="/checkout">
                <div className='header__optionBasket'>
                    <ShoppingCartIcon/>
                    <span className='header_optionLineTwo header_basketCount'>{basket?.length}</span>
                </div>
                </Link>
            </div>
        </div>
    );

}

export default Header;