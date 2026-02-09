"use client";
import { AgendaTableType } from "@/components/modules/agenda/agenda.type";
import AgendaCalendar from "@/components/modules/agenda/calendar/agendaCalendar";
import AgendaForm from "@/components/modules/agenda/form/agendaEventForm";
import AgendaTable from "@/components/modules/agenda/table/agendaTable";
import ModalLayout from "@/components/ui/modal/modalLayout";
import { PageTitle } from "@/components/ui/common/pageTitle";
import { Button, useDisclosure } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { usePaginationApiQuery } from "@/shared/hooks/http/usePaginationApiQuery";
import { useStepIndicatior } from "@/components/ui/common/step/useStepIndicatior";
import TabsCustom from "@/components/ui/common/tabsCustom";
import { tabsAgenda } from "@/components/modules/agenda/agenda.const";

const TABS = {
  Table: "table",
  Calendar: "calendar"
} as const;

type TabsType = (typeof TABS)[keyof typeof TABS];

export default function AgendaPage(): React.JSX.Element {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [plannedTempId, setPlannedTempId] = useState<number>(-1);
  const [selectedTab, setSelectedTab] = useState<TabsType>(TABS.Table);

  const { currentStep, steps, handleNext, handlePrev, setCurrentStep } = useStepIndicatior([
    "Agendar evento",
    "Agregar docentes"
  ]);

  const {
    data: agendaList,
    meta,
    handleChangePage
  } = usePaginationApiQuery<AgendaTableType[]>({
    key: "agenda-table",
    endpoint: "/plannedEvent",
    enabled: true,
    description: "agenda"
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleOpenModalForm = useCallback((plannedId: number) => {
    setPlannedTempId(plannedId);
    setCurrentStep(1);
    onOpenChange();
  }, []);

  useEffect(() => {
    if (!isOpen && plannedTempId !== -1) {
      setPlannedTempId(-1);
      setCurrentStep(0);
    }
  }, [isOpen, plannedTempId]);
  /* eslint-enable react-hooks/exhaustive-deps */
  return (
    <div className="space-y-8">
      <PageTitle title="Agenda" iconName="CalendarCheck" imageSrc="/titles/plannedEvent.svg" />
      <div className="border border-neutral-200 p-4 rounded-lg space-y-4">
        <div className="flex justify-between items-center">
          <h3>Agenda</h3>
          <Button className="btn-primary" onPress={onOpen}>
            Registrar agenda
          </Button>
        </div>

        <TabsCustom setSelectedTab={setSelectedTab} selectedTab={selectedTab} tabs={tabsAgenda} />

        {selectedTab === TABS.Table ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AgendaTable
                agendaList={agendaList}
                meta={meta}
                handleChangePage={handleChangePage}
                handleOpenForm={handleOpenModalForm}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AgendaCalendar agendaList={agendaList} />
            </motion.div>
          </AnimatePresence>
        )}

        <ModalLayout size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
          <AgendaForm
            currentStep={currentStep}
            steps={steps}
            plannedTempId={plannedTempId}
            setplannedTempId={setPlannedTempId}
            handleNext={handleNext}
            handlePrev={handlePrev}
            onClose={onClose}
          />
        </ModalLayout>
      </div>
    </div>
  );
}
