import {
  useKanban,
  columns,
  displayStatusLabels,
  displayStatusStyles,
  getColumnTasks,
  getActionLabel,
  formatDueDate,
} from "../hooks/useKanban";
import { CalendarDays } from "lucide-react";
import Modal from "../../../components/Modal";
import type { Task, RawTaskStatus } from "../../../types/task";

interface KanbanBoardProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: RawTaskStatus) => void;
}

const KanbanBoard = ({ tasks, onStatusChange }: KanbanBoardProps) => {
  const {
    selectedTask,
    setSelectedTask,
    dragOverColumn,
    setDragOverColumn,
    handleDragStart,
    handleDrop,
  } = useKanban(onStatusChange);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
              Tiến độ công việc
            </p>
            <h1 className="mt-2 text-4xl font-black">Kanban Board Mentor</h1>
            <p className="mt-2 text-sm text-gray-600">
              Kéo thả task giữa các cột để thay đổi trạng thái.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            Kéo thả để cập nhật trạng thái nhanh.
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        {columns.map((column) => (
          <div
            key={column.rawStatus}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, column.rawStatus)}
            onDragEnter={() => setDragOverColumn(column.rawStatus)}
            onDragLeave={() => setDragOverColumn(null)}
            className={`rounded-3xl border bg-white p-6 shadow-sm transition-all duration-200 ${
              dragOverColumn === column.rawStatus
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                  {column.title}
                </p>
                <p className="text-3xl font-black text-gray-900">
                  {getColumnTasks(column.rawStatus, tasks).length}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {getColumnTasks(column.rawStatus, tasks).map((task) => (
                <button
                  key={task.id}
                  type="button"
                  draggable
                  onDragStart={(event) => handleDragStart(event, task.id)}
                  onClick={() => setSelectedTask(task)}
                  className="w-full rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-black hover:bg-gray-50"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <p className="text-base font-bold text-gray-900">
                      {task.title}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${displayStatusStyles[task.displayStatus]}`}
                    >
                      {displayStatusLabels[task.displayStatus]}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold text-gray-900">
                        Người nhận:{" "}
                      </span>
                      {task.assigneeName || "Chưa gán"}
                    </div>

                    {task.dueDate && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <CalendarDays size={16} />
                        <span>{formatDueDate(task.dueDate)}</span>
                      </div>
                    )}

                    {task.rejectedCount && task.rejectedCount > 0 && (
                      <div className="text-orange-600">
                        Đã bị trả lại {task.rejectedCount} lần
                      </div>
                    )}
                  </div>
                </button>
              ))}

              {getColumnTasks(column.rawStatus, tasks).length === 0 && (
                <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                  Không có task
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
      >
        {/* // Hiển thị chi tiết task khi có task được chọn */}
        {selectedTask && (
          <div className="p-10">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                  Task detail
                </p>
                <h2 className="mt-2 text-3xl font-black text-gray-900">
                  {selectedTask.title}
                </h2>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${displayStatusStyles[selectedTask.displayStatus]}`}
              >
                {displayStatusLabels[selectedTask.displayStatus]}
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4 rounded-3xl border border-gray-200 bg-slate-50 p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                    Người nhận
                  </p>
                  <p className="mt-2 text-lg font-bold text-gray-900">
                    {selectedTask.assigneeName || "Chưa gán"}
                  </p>
                </div>

                {selectedTask.dueDate && (
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                      Hạn chót
                    </p>
                    <p className="mt-2 text-lg text-gray-900">
                      {formatDueDate(selectedTask.dueDate)}
                    </p>
                  </div>
                )}

                {selectedTask.rejectedCount &&
                  selectedTask.rejectedCount > 0 && (
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                        Lần bị trả lại
                      </p>
                      <p className="mt-2 text-lg text-orange-700">
                        {selectedTask.rejectedCount} lần
                      </p>
                    </div>
                  )}
              </div>

              <div className="space-y-4 rounded-3xl border border-gray-200 bg-slate-50 p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                    Mô tả
                  </p>
                  <p className="mt-2 text-gray-700">
                    {selectedTask.description}
                  </p>
                </div>

                {selectedTask.attachments &&
                  selectedTask.attachments.length > 0 && (
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="mb-2 text-sm uppercase tracking-[0.35em] text-gray-500">
                        File đính kèm
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {selectedTask.attachments.map((attachment) => (
                          <li key={attachment} className="break-words">
                            • {attachment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                    Hành động
                  </p>
                  <p className="mt-3 text-base text-gray-700">
                    {getActionLabel(selectedTask)}
                  </p>
                  <div className="mt-4 rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-600">
                    {selectedTask.rawStatus === "TODO" &&
                    !selectedTask.assigneeId
                      ? "Mentor có thể mở luồng gán Intern nếu cần."
                      : selectedTask.rawStatus === "IN_REVIEW"
                        ? "Mentor có thể mở màn hình review task này."
                        : selectedTask.rawStatus === "DONE"
                          ? "Chỉ xem được kết quả, không đổi trạng thái trực tiếp."
                          : "Xem chi tiết task."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default KanbanBoard;
