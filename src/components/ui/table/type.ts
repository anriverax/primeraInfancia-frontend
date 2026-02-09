export interface GenericTableProps<T> {
  items: T[];
  columns: Array<{ key: string; label: string }>;
  renderCell: (item: T, key: string) => React.ReactNode;
  ariaLabel: string;
  pagination?: {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
  };
  isLoading?: boolean;
}
