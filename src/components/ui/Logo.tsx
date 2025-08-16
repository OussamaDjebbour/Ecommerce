import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShoppingCart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

// function Logo() {
//   return (
//     // <div className="ml-[1.75rem] mt-4 flex items-center gap-4">
//     <div className="ml-4 mt-4 flex items-center gap-3 xl:ml-[1.75rem] xl:gap-4">
//       <FontAwesomeIcon
//         // className="rounded-md bg-[#E8FCFF] p-3.5"
//         className="rounded-md bg-[#E8FCFF] p-2.5 xl:p-3.5"
//         color="#016170"
//         size="xl"
//         icon={faCartShopping}
//       />
//       {/* <h1 className="font-publicSans text-2xl font-bold text-[#016170]"> */}
//       <h1 className="font-publicSans text-xl font-bold text-[#016170] xl:text-2xl">
//         ShopNest.
//       </h1>
//     </div>
//   );
// }

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
