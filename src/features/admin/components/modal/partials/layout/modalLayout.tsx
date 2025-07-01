import { Modal, ModalContent, ModalVariantProps } from "@heroui/react";
import { memo, PropsWithChildren } from "react";

type ModalLayoutProps = Pick<ModalVariantProps, "size">;

const ModalLayout = memo(
  ({ size, children }: PropsWithChildren<ModalLayoutProps>): React.JSX.Element => (
    <Modal
      scrollBehavior="inside"
      backdrop="blur"
      defaultOpen={true}
      placement="center"
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      hideCloseButton={true}
      size={size}
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
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  )
);

ModalLayout.displayName = "MemorizedModalLayout";
export default ModalLayout;
