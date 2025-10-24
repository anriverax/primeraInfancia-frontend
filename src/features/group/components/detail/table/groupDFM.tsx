import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useRouter } from "next/navigation";
import useGroupDFM from "../../../hooks/useGroupDFM";
// import { useGetAnswer } from "@/features/mentoring/global/useGetAnswer";
import { groupDetailByUserColumns, useRenderGroupDFMCell } from "./groupColumns";
import { tableClassNames } from "@/shared/constants";
import { IGroupByUser, IGroupByUserColumnKey } from "@/features/group/groupType";
import { TableLayout } from "@/shared/ui/custom/tableLayout";
// import { PersonAppendixDto } from "@/features/mentoring/mentoringType";
import TrainerView from "@/features/mentoring/component/trainerView"; // optional: render TrainerView for selected

const GroupDFM = (): React.JSX.Element => {
  const router = useRouter();
  const { groupDetailList } = useGroupDFM();
  const { renderCell: renderGroupDFM, selectedRows } = useRenderGroupDFMCell();

  const groupList = groupDetailList ?? [];
  groupList?.sort((a, b) => (a.Person?.fullName ?? "").localeCompare(b.Person?.fullName ?? ""));
  // let value = "2"
  // const idArray = groupList.map(item => item.id);
  // const { dashboardDetail } = useGetAnswer(idArray);

  // console.log(groupDetailList, "###");

  // if (value == "1")
  return (
    <>
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
                    {renderGroupDFM(
                      groupDetailByUserItem,
                      groupDetailByUserKey as IGroupByUserColumnKey
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableLayout>

      <div className="mt-4">
        {selectedRows && selectedRows.length > 0 ? (
          <div className="p-4 bg-white border rounded">
            <div className="font-medium mb-2">Selected rows</div>
            <ul className="space-y-1">
              {selectedRows.map((r) => (
                <li key={r.id}>
                  {r.fullName ?? "(sin nombre)"} — id: {r.id}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-2">
              {/* navigate to anexos with comma-separated ids */}
              <button
                type="button"
                className="px-3 py-1 bg-primary-600 text-white rounded"
                onClick={() =>
                  router.push(
                    `/admin/grupos/anexos?inscriptionId=${selectedRows.map((s) => s.id).join(",")}`
                  )
                }
              >
                Open Anexos (selected)
              </button>

              {/* open first selected in TrainerView (pass as prop) */}
              <button
                type="button"
                className="px-3 py-1 border rounded"
                onClick={() =>
                  router.push(
                    `/admin/grupos/anexos/${selectedRows[0].id}/mentoria/1?fullName=${encodeURIComponent(
                      selectedRows[0].fullName ?? ""
                    )}`
                  )
                }
              >
                Open Trainer (first)
              </button>
            </div>

            {/* optional: render TrainerView inline for the first selection */}
            {selectedRows[0] && (
              <div className="mt-4">
                <TrainerView inscriptionId={selectedRows[0].id} /* fullName prop if supported */ />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GroupDFM;

// you can now read selectedRows anywhere in this component
// console.log(selectedRows);
