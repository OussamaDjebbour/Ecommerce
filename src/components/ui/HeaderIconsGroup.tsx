import CartButton from "./CartButton";

function HeaderIconsGroup() {
  return (
    <div className="flex items-center gap-5">
      <CartButton />

      <button
        aria-label="Notifications"
        className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <img src="/images/notification.png" alt="notification Icon" />
      </button>

      <img
        src="/images/profile.png"
        alt="User profile"
        className="h-11 w-11 cursor-pointer rounded-xl"
      />
    </div>
  );
}

export default HeaderIconsGroup;
