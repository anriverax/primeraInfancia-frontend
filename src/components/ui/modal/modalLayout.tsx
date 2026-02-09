import { Modal, ModalContent, ModalProps, ModalVariantProps } from "@heroui/react";
import { memo, PropsWithChildren } from "react";

type ModalLayoutProps = Pick<ModalVariantProps, "size"> & Pick<ModalProps, "isOpen" | "onOpenChange">;

const ModalLayout = memo(
  ({ size, isOpen, onOpenChange, children }: PropsWithChildren<ModalLayoutProps>): React.JSX.Element => (
    <Modal
      portalContainer={typeof document !== "undefined" ? document.body : undefined}
      scrollBehavior="inside"
      classNames={{
        body: "rounded-lg",
        closeButton:
          "top-4 right-4 text-white hover:bg-neutral-500/20 hover:cursor-pointer active:bg-neutral-500/30"
      }}
      defaultOpen={false}
      placement="center"
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      size={size}
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn"
            }
          }
        }
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  )
);

ModalLayout.displayName = "MemorizedModalLayout";
export default ModalLayout;
