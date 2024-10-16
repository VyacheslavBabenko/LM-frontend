import React, { useMemo, useState } from "react";
import block from "bem-cn";

import SVG from "components/SVG";

import ArrowSVG from "../img/arrow.svg";
import { IPaginatorDropdownSelectorProps } from "./types";

import "./PaginatorDropdownSelector.scss";

const b = block("paginator-dropdown-selector-desktop");

const PaginatorDropdownSelector = ({
	pageCount,
	currentPage,
	onPageClick,
}: IPaginatorDropdownSelectorProps) => {
	const [isOpen, changeOpen] = useState(false);

	// массив страниц с пропущенной активной страницей
	const items = useMemo(() => {
		const result = [];
		for (let i = 0; i < pageCount; i += 1) {
			if (currentPage === i) continue;
			result.push(i);
		}
		return result;
	}, [pageCount, currentPage]);

	const itemsList = useMemo(
		() =>
			items.map((item) => (
				<li key={item} className={b("item")} onClick={() => onPageClick(item)}>
					<span className={b("item-value")}>{item + 1}</span>
				</li>
			)),
		[items, onPageClick]
	);

	return (
		<div className={b({ open: isOpen })} onClick={() => changeOpen(!isOpen)}>
			<div className={b("selected-item")}>
				<span className={b("selected-item-value")}>{currentPage + 1}</span>
				<div className={b("selected-item-arrow-border")}>
					<SVG
						className={b("selected-item-arrow")}
						svgProps={{ src: ArrowSVG }}
					/>
				</div>
			</div>
			{isOpen && (
				<ul className={b("items")} onMouseLeave={() => changeOpen(false)}>
					{itemsList}
				</ul>
			)}
		</div>
	);
};

export default PaginatorDropdownSelector;
