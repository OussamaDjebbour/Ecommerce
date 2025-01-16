function HeaderIconsGroup() {
  return (
    <div className="flex items-center gap-5">
      <img
        src="/images/fi-br-shopping-cart.png"
        alt="Cart Icon"
        className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2"
      />
      <img
        src="/images/notification.png"
        alt="notification Icon"
        className="cursor-pointer rounded-xl bg-[#E8FCFF] p-2"
      />
      <img
        src="/images/retry.png"
        alt="Account Icon"
        className="cursor-pointer rounded-xl"
      />
    </div>
  );
}

export default HeaderIconsGroup;
