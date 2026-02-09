import GenericTable from "@/components/ui/table/genericTable";
import { agendaHeaderColumns, useRenderAgendaCell } from "./agendaColumns";
import { AgendaHeaderColumnsKey, AgendaTableType } from "../agenda.type";
import { IPagination } from "@/shared/types/globals";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Button, ModalBody, useDisclosure } from "@heroui/react";
import DrawerLayout from "@/components/ui/drawerLayout";
import AgendaDetails from "../details/agendaDetails";
import ModalLayout from "@/components/ui/modal/modalLayout";
import { ModalHeaderContent } from "@/components/ui/modal/modalHeaderCustom";
import { CalendarCheck } from "lucide-react";

type AgendaTableProps = {
  agendaList: never[] | AgendaTableType[];
  meta: IPagination | undefined;
  handleChangePage: Dispatch<SetStateAction<number>>;
  handleOpenForm: (plannedId: number) => void;
};

const AgendaTable = ({
  agendaList,
  meta,
  handleChangePage,
  handleOpenForm
}: AgendaTableProps): React.JSX.Element => {
  // const drawer = { isOpen, onOpen, onOpenChange } = useDisclosure();
  const drawer = useDisclosure();
  const modal = useDisclosure();
  const [plannedEventId, setPlannedEventId] = useState<number>(-1);

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleOnOpenDrawer = useCallback((plannedId: number) => {
    setPlannedEventId(plannedId);
    drawer.onOpen();
  }, []);

  const handleOnModal = useCallback((plannedId: number) => {
    setPlannedEventId(plannedId);
    modal.onOpen();
  }, []);
  console.log(handleOnModal);
  /* eslint-enable react-hooks/exhaustive-deps */

  const renderAgendaCell = useRenderAgendaCell(handleOpenForm, handleOnOpenDrawer);

  useEffect(() => {
    if (!drawer.isOpen && plannedEventId !== -1) {
      setPlannedEventId(-1);
    }
  }, [drawer.isOpen, plannedEventId]);

  return (
    <>
      <GenericTable
        items={agendaList}
        columns={agendaHeaderColumns}
        renderCell={(item, key) => renderAgendaCell(item, key as AgendaHeaderColumnsKey)}
        ariaLabel="Tabla para mostrar la agenda de calendarización de eventos"
        pagination={
          meta
            ? { currentPage: meta.currentPage, lastPage: meta.lastPage, onPageChange: handleChangePage }
            : undefined
        }
      />
      <DrawerLayout size="4xl" isOpen={drawer.isOpen} onOpenChange={drawer.onOpenChange}>
        <AgendaDetails plannedId={plannedEventId} />
      </DrawerLayout>

      <ModalLayout size="lg" isOpen={false}>
        <>
          <ModalHeaderContent
            title="Modalidad de trabajo"
            imageSrc="/titles/plannedEvent.svg"
            icon={<CalendarCheck className="h-6 w-6 text-neutral-600" />}
            variant="modal"
          />
          <ModalBody className="p-10 space-y-4">
            <h4>Seleccione una modalidad de trabajo</h4>
            <div className="flex gap-6 justify-between">
              <Button variant="bordered" className="w-1/2">
                Presencial
              </Button>
              <Button className="btn-primary w-1/2" type="submit">
                Virtual
              </Button>
            </div>
          </ModalBody>
        </>
      </ModalLayout>
    </>
  );
};

export default AgendaTable;
