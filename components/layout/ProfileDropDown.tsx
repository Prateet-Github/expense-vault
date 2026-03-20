import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type ProfileDropdownProps = {
  closeDropdown: () => void;
};

export default function ProfileDropdown({
  closeDropdown,
}: ProfileDropdownProps) {
  const { user, logout } = useAuth();

  return (
    <div className="absolute right-0 top-12 z-50 min-w-45 p-4 bg-black border border-emerald-500 rounded-lg shadow-lg flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
      {/* User Info */}
      <div className="flex flex-col items-center gap-2">
        <p className="font-medium text-white truncate max-w-37.5">
          {user?.name}
        </p>
      </div>

      <div className="border-t border-emerald-500" />

      {/* Logout */}
      <button
        onClick={async () => {
          await logout();
          closeDropdown();
        }}
        className="flex items-center gap-3 w-full text-left p-2 rounded hover:bg-red-500/10 text-red-400 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
