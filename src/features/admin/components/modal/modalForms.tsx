"use client";

import ModalLayout from "@/features/admin/components/modal/partials/layout/modalLayout";
import {
  IModalComponent,
  useModalRegistry
} from "@/features/admin/components/modal/partials/layout/modalRegistry";
import { useModalFormVisibleStore } from "@/shared/hooks/store/useModalFormVisibleStore";

import { TransitionPanel } from "@/shared/ui/motionPrimitive/TransitionPanel";

const ModalForms = (): React.JSX.Element => {
  const { isFormVisible } = useModalFormVisibleStore();
  const { components } = useModalRegistry();

  return (
    <ModalLayout size="md">
      <TransitionPanel
        activeIndex={isFormVisible}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        variants={{
          enter: { opacity: 0, height: 0 },
          center: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 }
        }}
      >
        {components.map(({ id, element }: IModalComponent) => (
          <div key={id} className={`mx-auto ${isFormVisible === 0 ? "max-w-full" : "max-w-md"}`}>
            {element}
          </div>
        ))}
      </TransitionPanel>
    </ModalLayout>
  );
};

export default ModalForms;
