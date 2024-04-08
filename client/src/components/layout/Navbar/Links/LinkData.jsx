import { FaShoppingCart } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import { GiReceiveMoney } from "react-icons/gi";
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
    path : '/seller-registration'
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
  }
];
export const sellerLinks = [
  {
    label:"Seller Dashboard",
    path : '/seller-dashboard'
  },
  {
    label: "Seller Orders",
    icon : <GiReceiveMoney/>,
    path: '/seller-orders'
  },
  {
    label : "Your Products",
    path : '/seller-products'
  }
]

export const userLinks = [
  {
    icon : <HomeIcon style={{ fontSize: 30 }}/>,
    path: '/'
  },
  {
    label : 'Wishlist',
    path :"/wishlist"
  },
  {
    icon: <CartIconWithBadge />,
    path: "/cart"
  },
  {
    label: 'Your Orders',
    icon: <GiReceiveMoney />,
    path : '/your-orders'
  }
];
