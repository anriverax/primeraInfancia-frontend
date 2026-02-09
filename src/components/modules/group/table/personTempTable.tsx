import GenericTable from "@/components/ui/table/genericTable";
import { ExcelReadCompareResult, PersonTempColumnsKey } from "../group.type";
import { PeTempHeaderColumns, useRenderPersonTempCell } from "./personTempDataColumn";
import { CalendarCheck } from "lucide-react";
import { ModalHeaderContent } from "@/components/ui/modal/modalHeaderCustom";
import { Button, ModalBody } from "@heroui/react";

type PersonTempTableProps = {
  personTempData: ExcelReadCompareResult;
};

const PersonTempTable = ({ personTempData }: PersonTempTableProps): React.JSX.Element => {
  const renderPersonTempCell = useRenderPersonTempCell();

  return (
    <div>
      <ModalHeaderContent
        title="Modalidad de trabajo"
        imageSrc="/titles/plannedEvent.svg"
        icon={<CalendarCheck className="h-6 w-6 text-neutral-600" />}
        variant="modal"
      />
      <ModalBody className="p-10 space-y-4">
        <div>
          <p className="font-bold">[{personTempData.label}]</p>
          <span>ENCONTRADOS: {personTempData.found}</span>
        </div>
        <GenericTable
          items={personTempData.notFound}
          columns={PeTempHeaderColumns}
          renderCell={(item, key) => renderPersonTempCell(item, key as PersonTempColumnsKey)}
          ariaLabel="Tabla para mostrar la agenda de calendarización de eventos"
        />
        <Button className="btn-primary">Seguir validando</Button>
      </ModalBody>
    </div>
  );
};

export default PersonTempTable;
