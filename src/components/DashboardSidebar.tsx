import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Brain, BarChart3,
  Settings, LogOut, ChevronLeft, ChevronRight, Compass
} from "lucide-react";
import logo from "@/assets/edubot-logo.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Compass, label: "Resources", path: "/resources" },
  { icon: Brain, label: "AI Tutor", path: "/dashboard" },
  { icon: BarChart3, label: "Progress", path: "/dashboard" },
  { icon: Settings, label: "Settings", path: "/dashboard" },
];

interface Props {
  open: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ open, onToggle }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 bg-card border-r border-border transition-all duration-300 flex flex-col
          ${open ? "w-64" : "w-20"}
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-5 flex items-center gap-3">
          <img src={logo} alt="EduBot AI" className="w-10 h-10 shrink-0" width={512} height={512} />
          {open && (
            <span className="text-lg font-heading font-bold text-foreground whitespace-nowrap">
              EduBot AI
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => { navigate(item.path); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
              >
                <item.icon size={20} className="shrink-0" />
                {open && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut size={20} className="shrink-0" />
            {open && <span>Sign Out</span>}
          </button>
        </div>

        {/* Toggle */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border items-center justify-center text-muted-foreground hover:text-foreground shadow-sm"
        >
          {open ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>
    </>
  );
};

export default DashboardSidebar;
