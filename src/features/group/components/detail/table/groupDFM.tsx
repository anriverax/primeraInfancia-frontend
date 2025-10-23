import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import useGroupDFM from "../../../hooks/useGroupDFM";
// import { useGetAnswer } from "@/features/mentoring/global/useGetAnswer";
import { groupDetailByUserColumns, useRenderGroupDFMCell } from "./groupColumns";
import { tableClassNames } from "@/shared/constants";
import { IGroupByUser, IGroupByUserColumnKey } from "@/features/group/groupType";
import { TableLayout } from "@/shared/ui/custom/tableLayout";
// import { PersonAppendixDto } from "@/features/mentoring/mentoringType";
const GroupDFM = (): React.JSX.Element => {
  const { groupDetailList } = useGroupDFM();
  const renderGroupDFM = useRenderGroupDFMCell();

  const groupList = groupDetailList ?? [];
  groupList?.sort((a, b) => (a.Person?.fullName ?? "").localeCompare(b.Person?.fullName ?? ""));
  // let value = "2"
  // const idArray = groupList.map(item => item.id);
  // const { dashboardDetail } = useGetAnswer(idArray);

  // console.log(groupDetailList, "###");

  // if (value == "1")
  return (
    <TableLayout>
      <Table
        removeWrapper
        className="min-w-[max-content]"
        classNames={tableClassNames}
        aria-label="Tabla para mostrar las rutas de aprendizaje registradas"
      >
        <TableHeader columns={groupDetailByUserColumns}>
          {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={!groupList} items={groupList || []}>
          {(groupDetailByUserItem: IGroupByUser) => (
            <TableRow key={groupDetailByUserItem.id}>
              {(groupDetailByUserKey) => (
                <TableCell>
                  {renderGroupDFM(groupDetailByUserItem, groupDetailByUserKey as IGroupByUserColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableLayout>
  );
  // else return (
  //   <TableLayout>
  //     <Table
  //       removeWrapper
  //       className="min-w-[max-content]"
  //       classNames={tableClassNames}
  //       aria-label="Tabla para mostrar las rutas de aprendizaje registradas"
  //     >
  //       <TableHeader columns={groupDetailByUserColumns}>
  //         {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
  //       </TableHeader>
  //       <TableBody isLoading={!dashboardDetail} items={dashboardDetail || []}>
  //         {(groupDetailByUserItem: PersonAppendixDto) => (
  //           <TableRow key={groupDetailByUserItem.Person.firstName}>
  //             {(groupDetailByUserKey) => (
  //               <TableCell>
  //                 {renderGroupDFM(groupDetailByUserItem, groupDetailByUserKey as IGroupByUserColumnKey)}
  //               </TableCell>
  //             )}
  //           </TableRow>
  //         )}
  //       </TableBody>
  //     </Table>
  //   </TableLayout>
  // );
};

export default GroupDFM;
