import { Tooltip } from "@heroui/react";
import { EditIcon, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { IEnrollmentColumnKey, IEnrollmentTable, EnrollmentInput } from "../../enrollmentType";

export const enrollmentColumns: IColumns<IEnrollmentColumnKey>[] = [
  {
    key: "teacherId",
    label: "Teacher id"
  },
  {
    key: "groupId",
    label: "Group id"
  },
  {
    key: "mentorId",
    label: "Mentor id"
  },
  {
    key: "administrativeStatus",
    label: "Administrative status"
  }
];

/* eslint-disable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
export const useRenderEnrollmentCell = (): ((
  _enrollment: IEnrollmentTable,
  _columnKey: IEnrollmentColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((enrollment: IEnrollmentTable, columnKey: IEnrollmentColumnKey) => {
    const cellValue = enrollment[columnKey as keyof EnrollmentInput];

    switch (columnKey) {
      // case "count":
      //   return (
      //     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
      //       {enrollment._count?.Group} grupos
      //     </span>
      //   );
      // case "actions":
      //   return (
      //     <div className="relative flex items-center gap-2">
      //       <Tooltip content="Editar zona0">
      //         <span
      //           className="text-lg text-default-400 cursor-pointer active:opacity-50"
      //           onClick={() => onEditEnrollment("Z", enrollment)}
      //         >
      //           <EditIcon className="h-4 w-4" />
      //         </span>
      //       </Tooltip>
      //       <Tooltip color="danger" content="Eliminar zona">
      //         <span
      //           className="text-lg text-danger cursor-pointer active:opacity-50"
      //           onClick={() => onConfirmDeleteEnrollment(enrollment.id as number)}
      //         >
      //           <Trash2 className="h-4 w-4" />
      //         </span>
      //       </Tooltip>
      //     </div>
      //   );
      default:
        return cellValue;
    }
  }, []);
};

/* eslint-enable react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any */
