import Badge from "./Badge";
import SkeletonRow from "./SkeletonRow";
import { InternStatus } from "../types/intern";
import { useInterns } from "../hooks/useInterns";

interface DataTableProps {
  page: number;
  limit: number;
}

const DataTable = ({ page, limit }: DataTableProps) => {
  const { data, isLoading } = useInterns({ page, limit });

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="max-h-[500px] overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b text-left text-sm uppercase tracking-wide text-gray-500">
              <th className="px-8 py-6">Họ tên & Mã số</th>
              <th className="px-8 py-6">Vị trí</th>
              <th className="px-8 py-6">Email</th>
              <th className="px-8 py-6">Số điện thoại</th>
              <th className="px-8 py-6">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            )}

            {!isLoading &&
              data.map((intern) => (
                <tr
                  key={intern.id}
                  className="border-b transition hover:bg-gray-50"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 font-bold">
                        {intern.fullName
                          .split(" ")
                          .map((word) => word[0])
                          .slice(-2)
                          .join("")}
                      </div>

                      <div>
                        <p className="font-bold">{intern.fullName}</p>
                        <p className="text-sm text-gray-500">{intern.code}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <Badge label={intern.position} />
                  </td>

                  <td className="px-8 py-6 text-gray-700">
                    {intern.email}
                  </td>

                  <td className="px-8 py-6 text-gray-700">
                    {intern.phone}
                  </td>

                  <td className="px-8 py-6">
                    <Badge
                      label={intern.status}
                      variant={
                        intern.status === InternStatus.INTERNING
                          ? "success"
                          : "default"
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-3 p-6">
        <button className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200">
          ←
        </button>

        <button className="rounded-lg bg-black px-4 py-2 text-white">
          1
        </button>

        <button className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200">
          →
        </button>
      </div>
    </div>
  );
};

export default DataTable;