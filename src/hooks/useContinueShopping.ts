import { useLocation, useNavigate } from "react-router-dom";

export function useContinueShopping(
  path: string = "/checkout",
  path2?: string,
) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;

  const handleContinueShopping = () => {
    if (from && from !== path && from !== path2 && from !== "/wishlist") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return handleContinueShopping;
}
