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
            wrapper: "bg-white py-1 shadow-none",
            item: "border-0 !rounded-lg text-sm text-neutral-600 data-[active=true]:bg-primary-500 data-[active=true]:text-white hover:text-primary-500 hover:!bg-transparent hover:cursor-pointer data-[active=true]:hover:cursor-pointer data-[active=true]:hover:!bg-primary-500"
          }}
          onChange={(e) => onChange(e)}
        />
      </div>
    );
  }
);

CustomPagination.displayName = "MemorizedCustomPagination";

export default CustomPagination;
