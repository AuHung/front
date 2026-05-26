import { Bell, CircleUserRound } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed left-[260px] right-0 top-0 z-10 flex h-[80px] items-center justify-between border-b bg-[#f5f5f5] px-10">
      <h2 className="text-2xl font-bold">Intern Management</h2>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer" />
        <CircleUserRound className="cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;