import { useNavigate } from "react-router-dom";
import useSearchParams from "../../hooks/useSearchParams";

interface MenuItemProps {
  item: { label: string; icon: React.ReactNode };
}

const MenuItem = ({ item }: MenuItemProps) => {
  const navigate = useNavigate();
  const { setSearchQuery } = useSearchParams();

  function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
    if (
      e.target === e.currentTarget &&
      e.currentTarget.textContent === "Home" &&
      window.location.pathname !== "/"
    ) {
      setSearchQuery("");
      navigate("/");
    }
  }

  return (
    <button
      key={item.label}
      className="flex items-center gap-6 rounded-lg text-lg hover:bg-gray-50"
    >
      <span>{item.icon}</span>
      <span
        className="text-lg font-medium text-[#5C5C5C]"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {item.label}
      </span>
    </button>
  );
};

export default MenuItem;
