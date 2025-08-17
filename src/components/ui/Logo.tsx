import { ShoppingCart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Logo() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoToHomePage = () => {
    if (location.pathname !== "/") navigate("/");
  };

  return (
    <div
      onClick={handleGoToHomePage}
      className="ml-6 mt-4 flex w-fit cursor-pointer items-center gap-3 2xl:ml-[1.75rem] 2xl:gap-4"
    >
      <div className="rounded-md bg-[#E8FCFF] p-2.5 2xl:p-3.5">
        <ShoppingCart className="h-5 w-5 text-[#016170] 2xl:h-6 2xl:w-6" />
      </div>
      <h1 className="font-publicSans text-xl font-bold text-[#016170] 2xl:text-2xl">
        ShopNest.
      </h1>
    </div>
  );
}

export default Logo;
