/* eslint-disable no-continue */
import React from "react";
import block from "bem-cn";
import ReactPaginate from "react-paginate";

import SVG from "components/SVG";

import ArrowSVG from "./img/arrow.svg";

import { IPaginatorSwitcherProps } from "./types";
import "./PaginatorSwitcher.scss";

const b = block("paginator-switcher-mobile");

const PaginatorSwitcher = ({
	pageCount,
	currentPage,
	onPageClick,
}: IPaginatorSwitcherProps) => {
	const handlePageClick = (event: { selected: number }) => {
		onPageClick(event.selected);
	};

	return (
		<>
			<ReactPaginate
				forcePage={currentPage}
				breakLabel="..."
				previousLabel={
					<div className={b("arrow-left-container")}>
						<SVG className={b("arrow-left")} svgProps={{ src: ArrowSVG }} />
					</div>
				}
				nextLabel={
					<div className={b("arrow-right-container")}>
						<SVG className={b("arrow-right")} svgProps={{ src: ArrowSVG }} />
					</div>
				}
				onPageChange={handlePageClick}
				pageRangeDisplayed={0}
				marginPagesDisplayed={0}
				pageCount={pageCount > 0 ? pageCount : 1}
				renderOnZeroPageCount={/* null */ undefined}
				containerClassName={b()}
				pageClassName={b("page-item")}
				pageLinkClassName={b("page-link")}
				previousClassName={b("page-item")}
				previousLinkClassName={b("page-link")}
				nextClassName={b("page-item")}
				nextLinkClassName={b("page-link")}
				breakClassName={b("page-item")}
				breakLinkClassName={b("page-link")}
				activeClassName={b("active")}
			/>
		</>
	);
};

export default PaginatorSwitcher;
