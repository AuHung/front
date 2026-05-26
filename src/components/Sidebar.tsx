import { LayoutDashboard, Settings, Users } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[260px] flex-col border-r bg-[#eef0f3] px-4 py-6">
      <div>
        <h1 className="text-3xl font-black">ARCHITECT ADMIN</h1>
        <p className="mt-2 text-sm tracking-[0.3em] text-gray-500">
          MENTOR PORTAL
        </p>
      </div>

      <nav className="mt-16 flex flex-col gap-3">
        <button className="flex items-center gap-3 rounded-xl px-4 py-4 text-gray-600 transition hover:bg-white">
          <LayoutDashboard size={20} />
          Tổng quan
        </button>

        <button className="flex items-center gap-3 rounded-xl bg-white px-4 py-4 font-semibold text-black shadow-sm">
          <Users size={20} />
          Danh sách TTS
        </button>

        <button className="flex items-center gap-3 rounded-xl px-4 py-4 text-gray-600 transition hover:bg-white">
          <Settings size={20} />
          Cài đặt
        </button>
      </nav>

      <div className="mt-auto flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white font-bold">
          AH
        </div>

        <div>
          <p className="font-semibold">Âu Hùng</p>
          <p className="text-sm text-gray-500">Admin</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;