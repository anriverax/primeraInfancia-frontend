import { Accordion, AccordionItem } from "@heroui/react";
import { useDepartmentsList } from "../../hooks/useDepartmentsList";
import CustomProgress from "@/shared/ui/custom/customProgress";
import { useState } from "react";
import type { Selection } from "@heroui/react";
import { useGroupsByDepartment } from "../../hooks/useGroupsByDepartment";

const GroupDistribution = (): React.JSX.Element => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));
  const { departmentList } = useDepartmentsList();
  const { groups, isLoading, isError } = useGroupsByDepartment(Array.from(selectedKeys)[0].toString());
  console.log(groups, isLoading, isError);
  if (!departmentList) return <CustomProgress />;
  return (
    <>
      {Array.isArray(departmentList) && departmentList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(() => {
            const total = departmentList.length;
            const size = Math.ceil(total / 3);
            const col1 = departmentList.slice(0, size);
            const col2 = departmentList.slice(size, size * 2);
            const col3 = departmentList.slice(size * 2);

            const accordionMotionProps = {
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  overflowY: "unset",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    },
                    opacity: {
                      ease: "easeInOut",
                      duration: 1
                    }
                  }
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  overflowY: "hidden",
                  transition: {
                    height: {
                      ease: "easeInOut",
                      duration: 0.25
                    },
                    opacity: {
                      ease: "easeInOut",
                      duration: 0.3
                    }
                  }
                }
              }
            } as const;

            return (
              <>
                <Accordion
                  itemClasses={{ base: "hover:bg-default-100" }}
                  variant="splitted"
                  motionProps={accordionMotionProps}
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  {col1.map((department) => (
                    <AccordionItem
                      key={department.id}
                      title={department.name}
                      subtitle="Hacer click para expandir"
                    >
                      HOLA
                    </AccordionItem>
                  ))}
                </Accordion>

                <Accordion
                  itemClasses={{ base: "hover:bg-default-100" }}
                  variant="splitted"
                  motionProps={accordionMotionProps}
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  {col2.map((department) => (
                    <AccordionItem
                      key={department.id}
                      title={department.name}
                      subtitle="Hacer click para expandir"
                    >
                      HOLA
                    </AccordionItem>
                  ))}
                </Accordion>

                <Accordion
                  itemClasses={{ base: "hover:bg-default-100" }}
                  variant="splitted"
                  motionProps={accordionMotionProps}
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  {col3.map((department) => (
                    <AccordionItem
                      key={department.id}
                      title={department.name}
                      subtitle="Hacer click para expandir"
                    >
                      HOLA
                    </AccordionItem>
                  ))}
                </Accordion>
              </>
            );
          })()}
        </div>
      ) : null}
    </>
  );
};

export default GroupDistribution;
