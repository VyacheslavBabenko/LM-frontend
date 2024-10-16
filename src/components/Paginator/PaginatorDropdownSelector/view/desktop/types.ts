interface IPaginatorDropdownSelectorProps {
  pageCount: number;
  currentPage: number;
  onPageClick: (pageNumber: number) => void;
  label?: string;
}

export type { IPaginatorDropdownSelectorProps };
