import { Modal, ModalContent, ModalVariantProps } from "@heroui/react";
import { PropsWithChildren } from "react";

type ModalLayoutProps = Pick<ModalVariantProps, "size">;

const ModalLayout = ({ size, children }: PropsWithChildren<ModalLayoutProps>): React.JSX.Element => (
  <Modal
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
);

export default ModalLayout;
