import { useLocation, useNavigate } from "react-router-dom";

export function useContinueShopping(
  path: string = "/checkout",
  path2?: string,
) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;

  console.log("from", from);

  const handleContinueShopping = () => {
    console.log("yes", from, from !== "/wishlist");
    // if (from) {
    if (from && from !== path && from !== path2 && from !== "/wishlist") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return handleContinueShopping;
}
