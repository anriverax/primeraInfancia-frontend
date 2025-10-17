import { Pagination } from "@heroui/react";
import { memo, useCallback } from "react";

type CustomPaginationProps = {
  currentPage: number;
  lastPage: number;
  handleChangePage: (_e: number) => void;
};

const CustomPagination = memo(
  ({ currentPage, lastPage, handleChangePage }: CustomPaginationProps): React.JSX.Element => {
    const onChange = useCallback(
      (e: number) => {
        handleChangePage(e);
      },
      [handleChangePage]
    );

    return (
      <div className="flex w-full justify-center my-4">
        <Pagination
          isCompact
          showControls
          initialPage={currentPage}
          variant="light"
          total={lastPage}
          classNames={{
            wrapper: "bg-white py-1 shadow-small"
          }}
          onChange={(e) => onChange(e)}
        />
      </div>
    );
  }
);

CustomPagination.displayName = "MemorizedCustomPagination";

export default CustomPagination;
