import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutesSeller({isSellerAuth}) {
  return isSellerAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutesSeller;
