import { FaShoppingCart } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';

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
  }
];
