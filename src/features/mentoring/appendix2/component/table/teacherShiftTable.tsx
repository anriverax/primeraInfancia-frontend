import { TeacherShift } from "../../appendix2Type";
import { Trash2 } from "lucide-react";

type Props = {
  items: TeacherShift[];
  onDelete: (id: number | string) => void;
};

const TeacherShiftTable = ({ items, onDelete }: Props): React.JSX.Element => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th>Acción</th>
          <th>Total</th>
          <th>Turno</th>
          <th>Sección</th>
          <th>Niños</th>
          <th>Niñas</th>
          <th>Niños c/discapacidad</th>
          <th>Niñas c/discapacidad</th>

        </tr>
      </thead>
      <tbody>
        {items.map((row) => {
          const key = row.id ?? String(Math.random());
          return (
            <tr key={key}>
              <td>
                {/* usar el id de la fila al eliminar */}
                <button
                  type="button"
                  onClick={() => {
                    if (row.id === undefined) return;
                    onDelete(row.id);
                  }}
                  className="text-red-600 hover:underline"
                >
                  <Trash2 className="h-4 w-4 text-red-500 cursor-pointer" />
                </button>
              </td>
              <td>{row.boyNumber + row.girlNumber}</td>
              <td>{row.shift}</td>
              <td>{Array.isArray(row.section) ? row.section.join(", ") : row.section}</td>
              <td>{row.boyNumber}</td>
              <td>{row.girlNumber}</td>
              <td>{row.boyDisabilityNumber}</td>
              <td>{row.girlDisabilityNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TeacherShiftTable;
