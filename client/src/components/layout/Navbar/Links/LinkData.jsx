import { FaShoppingCart } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import { GiReceiveMoney } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
const CartIconWithBadge = () => {
  const carts = useSelector((state) => state.cart.carts);

  return (
    <Badge badgeContent={carts.length} color="success">
      <FaShoppingCart className='text-2xl'  />
    </Badge>
  );
};

export const generalLinks = [
  {
    icon: <HomeIcon/>,
    label: "Home",
    path:'/'
  }, 
  {
    label:"Seller",
    path : '/register-seller'
  }
];

export const adminLinks = [
  {
    label : "Dashboard",
    path : "/admin"
  },
  {
    label : "Users",
    path: "/admin-users"
  },
  {
    label: "Products",
    path: "/admin-products"
  },
  {
    label:"Categories",
    path:"/admin-categories"
  },
  {
    label: "Orders",
    path: "/admin-orders"
  }
];
export const sellerLinks = [

  {
    label:"Dashboard ",
    icon: <FaShop className="text-2xl"/> ,
    path: '/seller-dashboard',
  },
  
  {
    label: "Your Orders",
    icon : <GiReceiveMoney className="text-2xl pb-1"/>,
    path: '/seller-orders'
  },
  {
    label : "Your Products",
    path : '/seller-products'
  }
]

export const userLinks = [
  {
    label: 'Home',
    icon : <HomeIcon style={{ fontSize: 30 }}/>,
    path: '/'
  },
  {
    label : 'Wishlist',
    icon : <FaHeart className="text-xl"/>,
    path :"/wishlist"
  },
  {
    label: "Cart",
    icon: <CartIconWithBadge />,
    path: "/cart"
  },
  {
    label: 'Your Orders',
    icon: <GiReceiveMoney className='text-4xl pb-2'/>,
    path : '/your-orders'
  }
];
