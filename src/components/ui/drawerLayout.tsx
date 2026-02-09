import { Drawer, DrawerContent, DrawerProps, ModalVariantProps } from "@heroui/react";
import { memo, PropsWithChildren } from "react";

type DrawerLayoutProps = Pick<ModalVariantProps, "size"> & Pick<DrawerProps, "isOpen" | "onOpenChange">;

const DrawerLayout = memo(
  ({ size, isOpen, onOpenChange, children }: PropsWithChildren<DrawerLayoutProps>) => (
    <Drawer
      backdrop="opaque"
      isOpen={isOpen}
      size={size}
      radius="none"
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.3
            }
          },
          exit: {
            x: 100,
            opacity: 0,
            transition: {
              duration: 0.3
            }
          }
        }
      }}
      classNames={{
        closeButton:
          "top-4 right-4 text-white hover:bg-neutral-500/20 hover:cursor-pointer active:bg-neutral-500/30"
      }}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  )
);

DrawerLayout.displayName = "MemorizedDrawerLayout";
export default DrawerLayout;
