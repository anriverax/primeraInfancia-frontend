import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { GenericTableProps } from "./type";
import CustomPagination from "./customPagination";
import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const GenericTable = <T extends Record<string, any>>({
  items,
  columns,
  renderCell,
  ariaLabel,
  pagination,
  isLoading
}: GenericTableProps<T>): React.JSX.Element => (
  <div className="w-sm md:w-full overflow-x-auto bg-white rounded-lg border border-neutral-200">
    <div className="w-full">
      <Table
        classNames={{ wrapper: "p-0 w-full !shadow-none rounded-none" }}
        aria-label={ariaLabel}
        bottomContent={
          pagination &&
          items.length > 0 && (
            <CustomPagination
              currentPage={pagination.currentPage}
              lastPage={pagination.lastPage}
              handleChangePage={pagination.onPageChange}
            />
          )
        }
        bottomContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={isLoading} items={items ?? []}>
          {(item: T) => (
            <TableRow key={item.id}>
              {(key) => <TableCell>{renderCell(item, key as string)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
);
/* eslint-enable @typescript-eslint/no-explicit-any */
export default GenericTable;
