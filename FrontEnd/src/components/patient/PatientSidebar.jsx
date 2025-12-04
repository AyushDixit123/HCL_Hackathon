import { Link, useLocation } from "react-router-dom";

export default function PatientSidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/patient/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/patient/profile", label: "My Profile", icon: "👤" },
    { path: "/patient/goals", label: "Wellness Goals", icon: "🎯" },
    { path: "/patient/reminders", label: "Messages", icon: "💬" },
    { path: "/patient/wellness", label: "Health", icon: "❤️" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6">
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
        
        <div className="pt-4 mt-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-red-400 w-full transition-colors">
            <span className="text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}