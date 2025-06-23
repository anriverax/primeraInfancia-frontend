"use client";

import ModalLayout from "@/features/admin/components/modal/partials/layout/modalLayout";
import {
  ModalComponent,
  useModalRegistry
} from "@/features/admin/components/modal/partials/layout/modalRegistry";
import { useActiveFormStore } from "@/shared/hooks/store/useActiveFormStore";
import { TransitionPanel } from "@/shared/ui/motionPrimitive/TransitionPanel";

const FormModal = (): React.JSX.Element => {
  const { showForm } = useActiveFormStore();
  const { components } = useModalRegistry();

  return (
    <ModalLayout size="md">
      <TransitionPanel
        activeIndex={showForm}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        variants={{
          enter: { opacity: 0, height: 0 },
          center: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 }
        }}
      >
        {components.map(({ id, element }: ModalComponent) => (
          <div key={id} className={`mx-auto ${showForm === 0 ? "max-w-full" : "max-w-md"}`}>
            {element}
          </div>
        ))}
      </TransitionPanel>
    </ModalLayout>
  );
};

export default FormModal;
