import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import FloatingButton from "../components/FloatingButton";

import CreateTaskModal from "../features/tasks/components/CreateTaskModal";

const Dashboard = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Sidebar />

      <Header />

      <main className="ml-[260px] pt-[100px]">
        <div className="p-10">
          <h1 className="mb-10 text-6xl font-black">
            Danh sách Thực tập sinh
          </h1>

          <DataTable page={1} limit={5} />
        </div>
      </main>

      <FloatingButton
        onClick={() => setIsOpenModal(true)}
      />

      <CreateTaskModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};

export default Dashboard;