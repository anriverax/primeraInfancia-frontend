import { useCallback } from "react";
import { ITeacherShiftColumnKey, TeacherShift } from "../../appendix2Type";
import { Trash2 } from "lucide-react";

export const teacherShiftheaderColumns = [
  {
    key: "action",
    label: "Acción"
  },
  {
    key: "shift",
    label: "Turno"
  },
  {
    key: "section",
    label: "Sección"
  },
  {
    key: "boyNumber",
    label: "Niños atendidos"
  },
  {
    key: "girlNumber",
    label: "Niñas atendidas"
  },
  {
    key: "boyDisabilityNumber",
    label: "Niños con discapacidad"
  },
  {
    key: "girlDisabilityNumber",
    label: "Niñas con discapacidad"
  },
  {
    key: "total",
    label: "Total"
  }
];

export const useTeacherShiftCell = (
  onDelete: (id: number) => void
): ((
  _data: TeacherShift,
  _columnKey: ITeacherShiftColumnKey
) => string | number | undefined | null | React.JSX.Element) => {
  {
    /* eslint-disable react-hooks/exhaustive-deps */
  }
  return useCallback((data: TeacherShift, columnKey: ITeacherShiftColumnKey) => {
    const cellValue = data[columnKey as keyof TeacherShift];

    switch (columnKey) {
      case "total":
        return (
          <div className="relative flex items-center justify-center gap-2">
            {data.boyNumber + data.girlNumber}
          </div>
        );
      case "action":
        return (
          <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" onClick={() => onDelete(data.id!)} />
        );
      default:
        return cellValue;
    }
  }, []);
  {
    /* eslint-enable react-hooks/exhaustive-deps */
  }
};
