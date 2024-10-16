interface IPaginatorSwitcherProps {
  pageCount: number;
  currentPage: number;
  onPageClick: (pageNumber: number) => void;
  label?: string;
  aroundItems?: number;
  marginItems?: number;
  itemsCount?: number;
}

export type { IPaginatorSwitcherProps };
