import { Info } from "lucide-react";

const ListTeacher = (): React.JSX.Element => {
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 flex items-center gap-2">
        <Info className="h-5 w-5" />
        <h3 className="text-2xl font-semibold">Información de referencia</h3>
      </div>
    </div>
  );
};

export default ListTeacher;
