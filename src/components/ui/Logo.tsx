import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Logo() {
  return (
    <div className="ml-[1.75rem] mt-4 flex items-center gap-4">
      {/* <img
        className="w-[3.25rem] bg-[#E8FCFF]"
        src="/images/logo.png"
        alt="Soundix"
      /> */}
      <FontAwesomeIcon
        className="rounded-md bg-[#E8FCFF] p-3.5"
        color="#016170"
        size="xl"
        icon={faCartShopping}
      />
      <h1 className="font-publicSans text-2xl font-bold text-[#016170]">
        ShopNest.
      </h1>
    </div>
  );
}

export default Logo;
