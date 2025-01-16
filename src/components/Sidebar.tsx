export function Sidebar() {
  const menuItems = [
    { icon: "🏠", label: "Home", active: true },
    { icon: "🔍", label: "Explore" },
    { icon: "❤️", label: "Saved" },
    { icon: "🛒", label: "Cart" },
    { icon: "📊", label: "Selling" },
    { icon: "👤", label: "Profile" },
    { icon: "⏱️", label: "Purchase History" },
    { icon: "💬", label: "Contact us" },
    { icon: "⚙️", label: "Settings" },
  ];
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-4">
      <div className="mb-8 flex items-center gap-2">
        <img src="/images/logo.png" alt="Soundix" className="h-8" />
        <h1 className="text-xl font-bold">Soundix.</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-lg p-3 text-left ${item.active ? "bg-teal-50 text-teal-600" : "hover:bg-gray-50"}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 rounded-xl bg-blue-50 p-4">
        <h3 className="mb-2 font-medium">Need Help</h3>
        <p className="mb-4 text-sm text-gray-600">
          About Account Management Ordering & Payment refund and FAQ
        </p>
        <button className="w-full rounded-lg bg-white py-2 text-sm text-teal-600">
          Customer Service
        </button>
      </div>
    </aside>
  );
}
