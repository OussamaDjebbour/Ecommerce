import { useLocation, useNavigate } from "react-router-dom";

export function useContinueShopping(path: string = "/checkout") {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;

  console.log("pathpath", path, from);
  const handleContinueShopping = () => {
    if (from && from !== path) {
      navigate(-1);
    } else {
      navigate("/"); // fallback
    }
  };

  return handleContinueShopping;
}
