interface MenuItemProps {
  item: { label: string; icon: React.ReactNode };
}

const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <button
      key={item.label}
      className="flex items-center gap-6 rounded-lg text-lg hover:bg-gray-50"
    >
      <span>{item.icon}</span>
      <span className="text-lg font-medium text-[#5C5C5C]">{item.label}</span>
    </button>
  );
};

export default MenuItem;
