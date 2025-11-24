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
          <th>Niños con <br />discapacidad <br/> diagnosticada</th>
          <th>Niñas con <br />discapacidad <br/> diagnosticada</th>

        </tr>
      </thead>
      <tbody>
        {items.map((row) => {
          const key = row.id ?? String(Math.random());
          return (
            <tr key={key}>
              <td className="text-center">
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
              <td className="text-center">{row.boyNumber + row.girlNumber}</td>
              <td>{row.shift}</td>
              <td>{Array.isArray(row.section) ? row.section.join(", ") : row.section}</td>
              <td className="text-center">{row.boyNumber}</td>
              <td className="text-center">{row.girlNumber}</td>
              <td className="text-center">{row.boyDisabilityNumber}</td>
              <td className="text-center">{row.girlDisabilityNumber}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TeacherShiftTable;
